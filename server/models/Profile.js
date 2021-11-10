const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  status: {
    type: String,
  },
  school: {
    type: String,
  },
  github: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // skills: {
  // type: [String],
  // required: true
  // },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
