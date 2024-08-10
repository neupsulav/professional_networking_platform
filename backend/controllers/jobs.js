const mongoose = require("mongoose");
const User = require("../models/user");
const Company = require("../models/company");
const Job = require("../models/job");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");

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

module.exports = { createJob };
