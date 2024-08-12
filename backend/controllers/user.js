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
    .select(
      "_id name username email image followers following following_company"
    )
    .populate({ path: "followers", select: "name username image _id" })
    .populate({ path: "following", select: "name username image _id" })
    .populate({ path: "following_company", select: "name image _id" });

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
    .select(
      "_id name username email image followers following following_company"
    )
    .populate({ path: "followers", select: "name username image _id" })
    .populate({ path: "following", select: "name username image _id" })
    .populate({ path: "following_company", select: "name image _id" });

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
  // if cv is provided
  const file = req.file;

  if (!file) {
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
  } else {
    const fileUrl = `${req.protocol}://${req.get("host")}/public/uploads/cv${
      file.filename
    }`;

    const updateUser = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { ...req.body, cv: fileUrl },
      {
        new: true,
      }
    );

    if (!updateUser) {
      return next(new ErrorHandler("Something went wrong", 500));
    }

    res.status(201).send(updateUser);
  }
});

// to get people you may know recommendations
const peopleYouMayKnow = catchAsync(async (req, res, next) => {
  const user = await User.findById({ _id: req.user.userId }).select(
    "following"
  );

  if (!user) {
    throw new Error("User not found");
  }

  const followedByMyFollowing = await User.find({
    _id: { $in: user.following },
  }).select("following");

  const recommendations = [];

  followedByMyFollowing.forEach((followingUser) => {
    followingUser.following.forEach((followedUserId) => {
      if (followedUserId.toString() !== req.user.userId.toString()) {
        // Exclude our own ID
        recommendations.push({
          recommendedUserId: followedUserId,
          recommendedBy: followingUser._id,
        });
      }
    });
  });

  const uniqueRecommendations = Array.from(
    new Map(
      recommendations.map((item) => [item.recommendedUserId.toString(), item])
    ).values()
  );

  const detailedRecommendations = await Promise.all(
    uniqueRecommendations.map(async (recommendation) => {
      const recommendedUser = await User.findById(
        recommendation.recommendedUserId
      ).select("image name username position _id");

      const recommendingUser = await User.findById(
        recommendation.recommendedBy
      ).select("image name username position _id");

      return {
        recommendedUser,
        recommendedBy: recommendingUser,
      };
    })
  );

  res.status(200).send(detailedRecommendations);
});

module.exports = {
  userProfileData,
  selfProfileData,
  updateUserProfile,
  peopleYouMayKnow,
};
