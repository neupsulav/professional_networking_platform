const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const Comment = require("../models/comment");
const Notification = require("../models/notification");

// to get notifications
const getNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;

  const notifications = await Notification.find({ user: userId })
    .populate("user")
    .sort({
      createdAt: -1,
    });

  res.status(200).send(notifications);
});

module.exports = { getNotifications };
