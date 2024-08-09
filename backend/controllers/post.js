const User = require("../models/user");
const Post = require("../models/post");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");

// creating a post
const createPost = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;
  const { caption } = req.body;

  const createPost = await Post.create({
    user: userId,
    caption: req.body.caption,
  });

  createPost.save();

  res.status(201).json({ msg: "Post created" });
});

module.exports = { createPost };
