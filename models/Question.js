const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  avatar: {
    type: String,
  },
  responses: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      title: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      votes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Question = mongoose.model("post", QuestionSchema);
