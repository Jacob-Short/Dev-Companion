const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const Question = require("../../models/Question");
const User = require("../../models/User");

// @route      POST api/questions
// @desc       Create a Question
// @access     Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newQuestion = new Question({
        text: req.body.text,
        title: user.title,
        avatar: user.avatar,
        user: req.user.id,
      });

      const question = await newQuestion.save();

      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route      Get api/questions
// @desc       Get all questions
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    const questions = await Question.find().sort({ date: -1 });
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route      Get api/questions/:id
// @desc       Get question by ID
// @access     Private
router.get("/:id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) return res.status(404).send({ msg: "Question not found" });

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send({ msg: "Question not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route      DELETE api/questions/:id
// @desc       Delete a post
// @access     Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) return res.status(404).send({ msg: "Question not found" });

    // Check to make sure user is creator of question
    if (question.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authoraized" });
    }

    await question.remove();

    res.json({ msg: "Question removed" });

    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send({ msg: "Question not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route      POST api/questions/response/:id
// @desc       Create a response to a question
// @access     Private
router.post(
  "/response/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const question = await Question.findById(req.params.id);

      const newResponse = {
        text: req.body.text,
        title: user.title,
        avatar: user.avatar,
        user: req.user.id,
      };

      question.responses.unshift(newResponse);

      await question.save();

      res.json(question.responses);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route      DELETE api/questions/response/:id/:response_id
// @desc       Delete response
// @access     Private
router.delete("/response/:id/:response_id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    // Pull out response
    const response = question.responses.find(
      (response) => response.id === req.params.response_id
    );

    // Make sure response exists
    if (!response) {
      return res.status(404).json({ msg: "Response does not exist" });
    }

    // Check user
    if (response.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = question.responses
      .map((response) => response.user.toString())
      .indexOf(req.user.id);

    question.responses.splice(removeIndex, 1);

    await question.save();
    res.json(question.responses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route      PUT api/questions/response/vote/:response_id
// @desc       Vote for a response
// @access     Private
router.put("/response/vote/:id/:response_id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    // Pull out response
    const response = question.responses.find(
      (response) => response.id === req.params.response_id
    );

    // Make sure response exists
    if (!response) {
      return res.status(404).json({ msg: "Response does not exist" });
    }

    // Check if the psot has already been liked
    if (
      response.votes.filter((vote) => vote.user.toString === req.user.id)
        .length > 0
    ) {
      return res.json(400).json({ msg: "Response has already been voted" });
    }

    response.votes.unshift({ user: req.user.id });

    res.json(question.responses);

    await question.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
