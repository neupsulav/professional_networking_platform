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
  const user = await User.findOne({ _id: userId });
  const userProfileData = await User.findOne({ _id: userId })
    .select(
      "_id name username bio position location skills email image cv followers following following_company createdAt"
    )
    .populate({
      path: "followers",
      select: "name username image _id email position",
    })
    .populate({
      path: "following",
      select: "name username image _id email position",
    })
    .populate({
      path: "following_company",
      select: "name image _id email industry",
    });

  //   user's following and follow count
  const followersCount = userProfileData.followers.length;
  const followingCount = userProfileData.following.length;

  //   post posted by user if any
  const userPosts = await Post.find({ user: userProfileData._id })
    .select("_id user caption likes comments createdAt")
    .populate({
      path: "user",
      select: "_id name email image",
    })
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
  if (user.followers.includes(req.user.userId)) {
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
      "_id name username email image followers following following_company createdAt cv location bio skills position phone"
    )
    .populate({
      path: "followers",
      select: "name username image email position _id",
    })
    .populate({
      path: "following",
      select: "name username image email position _id",
    })
    .populate({
      path: "following_company",
      select: "name image _id industry email",
    });

  //   user's following and follow count
  const followersCount = userProfileData.followers.length;
  const followingCount = userProfileData.following.length;

  //   post posted by user if any
  const userPosts = await Post.find({ user: userProfileData._id })
    .select("_id user caption likes comments createdAt")
    .populate({
      path: "user",
      select: "_id name email image",
    })
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
  // extract data from req.body
  const { skills, ...otherFields } = req.body;

  // Check if skills is a string and convert to an array
  const formattedSkills =
    typeof skills === "string" ? skills.split(",") : skills;

  const fileUrls = {};

  if (req.files["image"]) {
    fileUrls.image = `${req.protocol}://${req.get("host")}/public/uploads/${
      req.files["image"][0].filename
    }`;
  }

  if (req.files["cv"]) {
    fileUrls.cv = `${req.protocol}://${req.get("host")}/public/uploads/${
      req.files["cv"][0].filename
    }`;
  }

  const updateUser = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    { ...otherFields, skills: formattedSkills, ...fileUrls },
    {
      new: true,
    }
  );

  res.status(200).send(updateUser);
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
      // Exclude our own ID and users we are already following
      if (
        followedUserId.toString() !== req.user.userId.toString() &&
        !user.following.includes(followedUserId.toString())
      ) {
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
      ).select("image name username email position _id");

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
