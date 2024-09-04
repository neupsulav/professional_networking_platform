const { default: mongoose } = require("mongoose");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const User = require("../models/user");

const followOther = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid UserID", 400));
  }
  const usersId = req.params.id;

  // to follow someone
  // check if already followed
  const ifAlreadyFollowing = await User.findOne({
    _id: req.user.userId,
    following: usersId,
  });

  if (!ifAlreadyFollowing) {
    //   update our following list
    const updateFollowing = await User.findByIdAndUpdate(
      {
        _id: req.user.userId,
      },
      { $push: { following: usersId } },
      { new: true }
    );

    //   update others followers list
    const updateFollowers = await User.findByIdAndUpdate(
      { _id: usersId },
      { $push: { followers: req.user.userId } },
      { new: true }
    );
    res.status(200).json({ msg: "User followed" });
  } else {
    const updateFollowing = await User.findByIdAndUpdate(
      {
        _id: req.user.userId,
      },
      { $pull: { following: usersId } },
      { new: true }
    );

    //   update others followers list
    const updateFollowers = await User.findByIdAndUpdate(
      { _id: usersId },
      { $pull: { followers: req.user.userId } },
      { new: true }
    );
    res.status(200).json({ msg: "User unfollowed" });
  }
});

// to check if we are following a certain user
const checkFollowing = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const thatUser = await User.findById({ _id: userId });

  const checkFollowing = thatUser.followers.includes(req.user.userId);

  res.status(200).json(checkFollowing);
});

module.exports = { followOther, checkFollowing };
