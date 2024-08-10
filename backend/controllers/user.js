const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");

// get other user profile details
const userProfileData = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid userId", 400));
  }

  const userId = req.params.id;

  //   user's profile data
  const userProfileData = await User.findOne({ _id: userId })
    .select("_id name username email image followers following")
    .populate({ path: "followers", select: "name username image _id" })
    .populate({ path: "following", select: "name username image _id" });

  //   user's following and follow count
  const followersCount = userProfileData.followers.length;
  const followingCount = userProfileData.following.length;

  //   post posted by user if any
  const userPosts = await Post.find({ user: userProfileData._id })
    .select("_id caption likes comments createdAt")
    .populate({
      path: "comments",
      select: "user content createdAt _id",
      populate: {
        path: "user",
        select: "name email _id image",
      },
    })
    .sort({ createdAt: -1 });

  let isFollowing = false;
  if (userProfileData.followers.includes(req.user.userId)) {
    isFollowing = true;
  }

  res.status(200).json({
    isFollowing,
    userProfileData,
    followersCount,
    followingCount,
    userPosts,
  });
  // }
});

// get self profile details
const selfProfileData = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;

  //   user's profile data
  const userProfileData = await User.findOne({ _id: userId })
    .select("_id name username email image followers following")
    .populate({ path: "followers", select: "name username image _id" })
    .populate({ path: "following", select: "name username image _id" });

  //   user's following and follow count
  const followersCount = userProfileData.followers.length;
  const followingCount = userProfileData.following.length;

  //   post posted by user if any
  const userPosts = await Post.find({ user: userProfileData._id })
    .select("_id caption likes comments createdAt")
    .populate({
      path: "comments",
      select: "user content createdAt _id",
      populate: {
        path: "user",
        select: "name email _id image",
      },
    })
    .sort({ createdAt: -1 });

  let isFollowing = false;
  if (userProfileData.followers.includes(req.user.userId)) {
    isFollowing = true;
  }

  res.status(200).json({
    isFollowing,
    userProfileData,
    followersCount,
    followingCount,
    userPosts,
  });
  // }
});

// update user profile
const updateUserProfile = catchAsync(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    {
      new: true,
    }
  );

  if (!updateUser) {
    return next(new ErrorHandler("Something went wrong", 500));
  }

  res.status(201).send(updateUser);
});

module.exports = { userProfileData, selfProfileData, updateUserProfile };
