const { default: mongoose } = require("mongoose");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const User = require("../models/user");
const Company = require("../models/company");

// follow and unfollow company
const followCompany = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid UserID", 400));
  }
  const companyId = req.params.id;
  const userId = req.user.userId;

  // to follow someone
  // check if already followed
  const ifAlreadyFollowing = await Company.findOne({
    _id: companyId,
    followers: userId,
  });

  if (!ifAlreadyFollowing) {
    //   update our following list
    const updateFollowing = await User.findByIdAndUpdate(
      {
        _id: req.user.userId,
      },
      { $push: { following_company: companyId } },
      { new: true }
    );

    //   update company's followers list
    const updateFollowers = await Company.findByIdAndUpdate(
      { _id: companyId },
      { $push: { followers: req.user.userId } },
      { new: true }
    );

    res.status(200).json({ msg: "Company followed" });
  } else {
    const updateFollowing = await User.findByIdAndUpdate(
      {
        _id: req.user.userId,
      },
      { $pull: { following_company: companyId } },
      { new: true }
    );

    //   update others followers list
    const updateFollowers = await Company.findByIdAndUpdate(
      { _id: companyId },
      { $pull: { followers: req.user.userId } },
      { new: true }
    );

    res.status(200).json({ msg: "Company unfollowed" });
  }
});

// to check if user is following a company
const isFollowing = catchAsync(async (req, res, next) => {
  const company = await Company.findById({ _id: req.params.id });

  const isFollowing = company.followers.includes(req.user.userId);

  res.status(200).send(isFollowing);
});

module.exports = { followCompany, isFollowing };
