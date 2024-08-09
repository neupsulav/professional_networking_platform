const mongoose = require("mongoose");
const User = require("./user");
const Comment = require("./comment");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  caption: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
