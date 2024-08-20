const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const Comment = require("../models/comment");
const Notification = require("../models/notification");
const post = require("../models/post");

// creating a post
const createPost = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;

  const createPost = await Post.create({
    user: userId,
    caption: req.body.caption,
  });

  createPost.save();

  res.status(201).json({ msg: "Post created" });
});

// like and dislike a post
const likePost = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid Post ID", 404));
  }

  const postId = req.params.id;

  // check if user already liked the post
  const checkIfLiked = await Post.findOne({
    _id: postId,
    likes: req.user.userId,
  });

  if (!checkIfLiked) {
    // like a post
    const like = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { likes: req.user.userId } },
      { new: true }
    );

    if (!like) {
      return next(new ErrorHandler("Something went wrong", 400));
    }

    // to push the notification
    const getPost = await Post.findOne({ _id: postId });
    const currentUser = await User.findById({ _id: req.user.userId });

    const createNotification = await Notification.create({
      user: getPost.user,
      content: `${currentUser.name} liked your post`,
      post: getPost._id,
    });

    createNotification.save();

    res
      .status(200)
      .json({ msg: "Liked the post", likesCount: like.likes.length });
  } else {
    // preventing a user to like a post multiple times
    const preventMultipleLikes = await Post.findByIdAndUpdate(
      { _id: postId },
      { $pull: { likes: req.user.userId } },
      { new: true }
    );

    if (!preventMultipleLikes) {
      return next(new ErrorHandler("Something went wrong", 400));
    }

    res.status(200).json({
      msg: "Disliked the post",
      likesCount: preventMultipleLikes.likes.length,
    });
  }
});

//comment on a post
const createComment = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid Post Id", 400));
  }

  const postId = req.params.id;

  const saveComment = await Comment.create({
    user: req.user.userId,
    content: req.body.content,
  });

  saveComment.save();

  const updatePost = await Post.findByIdAndUpdate(
    { _id: postId },
    { $push: { comments: saveComment._id } },
    { new: true }
  );

  if (!updatePost) {
    return next(new ErrorHandler("Something went wrong", 400));
  }

  // to push the notification
  const getPost = await Post.findOne({ _id: postId });
  const currentUser = await User.findById({ _id: req.user.userId });

  const createNotification = await Notification.create({
    user: getPost.user,
    content: `${currentUser.name} commented your post`,
    post: getPost._id,
  });

  createNotification.save();

  res.status(201).json({ success: true });
});

// get posts
const getPost = catchAsync(async (req, res, next) => {
  const thisUser = await User.findById({ _id: req.user.userId });

  const posts = await Post.find({ user: thisUser.following })
    .populate({
      path: "user",
      select: "_id name username email image",
    })
    .populate({
      path: "comments",
      select: "_id name username email image content createdAt",
    })
    .populate({
      path: "likes",
      select: "_id name username email image ",
    })
    .sort({ createdAt: -1 });

  if (!posts) {
    return next(new ErrorHandler("Something went wrong!", 400));
  }

  if (posts.length === 0) {
    res.status(200).json([]);
  } else {
    res.status(200).json(posts);
  }
});

// get likes count for a post
const getLikesCount = catchAsync(async (req, res, next) => {
  const post = await Post.findById({ _id: req.params.id });

  const likesCount = post.likes.length;

  const isLiked = post.likes.includes(req.user.userId);

  res.status(200).json({ likesCount: likesCount, isLiked: isLiked });
});

// to get comments and comments count
const getComments = catchAsync(async (req, res, next) => {
  const comments = await Post.findById({
    _id: req.params.id,
  })
    .select("comments")
    .populate({
      path: "comments",
      select: "_id user content createdAt",
    })
    .populate({
      path: "comments",
      populate: [
        { path: "user", select: "_id name username image email position" },
      ],
    });

  const commentsCount = comments.comments.length;

  res.status(200).json({ comments, commentsCount });
});

module.exports = {
  createPost,
  likePost,
  createComment,
  getPost,
  getLikesCount,
  getComments,
};
