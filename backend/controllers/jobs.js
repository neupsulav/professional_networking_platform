const mongoose = require("mongoose");
const User = require("../models/user");
const Company = require("../models/company");
const Job = require("../models/job");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const job = require("../models/job");

// create a job vacancy
const createJob = catchAsync(async (req, res, next) => {
  const companyId = req.user.companyId;

  const newJob = await Job.create({
    company: companyId,
    position: req.body.position,
    intro: req.body.intro,
    salary: req.body.salary,
    location: req.body.location,
    deadline: req.body.deadline,
    noOfPost: req.body.noOfPost,
    requirements: req.body.requirements,
    responsibilities: req.body.responsibilities,
  });

  if (!newJob) {
    return next(new ErrorHandler("Something went wrong", 500));
  }

  newJob.save();

  res.status(201).send(newJob);
});

// get jobs
const getJobs = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;

  const thisUser = await User.findById({ _id: userId });

  const currentDate = new Date();

  const jobs = await Job.find({
    company: thisUser.following_company,
    deadline: { $gte: currentDate },
  })
    .populate("company")
    .sort({ createdAt: -1 });

  res.status(200).send(jobs);
});

module.exports = { createJob, getJobs };
