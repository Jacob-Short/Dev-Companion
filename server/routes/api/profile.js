const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator/check");

const profile = require("../../models/Profile");
const user = require("../../models/User");

// @route      GET   api/profile/self
// @desc       Get current users profile
// @access     Private
router.get("/self", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route      POST   api/profile
// @desc       Create or update a user profile
// @access     Private
router.post(
  "/",
  [auth, [check("status", "Status is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, location, website, bio, status, school, github } =
      req.body;

    // Build profile obj
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (school) profileFields.school = school;
    if (github) profileFields.github = github;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route      GET   api/profile
// @desc       Get all profiles
// @access     Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route      GET   api/profile/user/:user_id
// @desc       Get profile by user ID
// @access     Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});


// @route      DELETE   api/profile
// @desc       Delete profile, user & questions
// @access     Private
router.delete("/", auth, async (req, res) => {
    try {
      // @TODO:
        // remove users questions

      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });

      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: 'User Deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
