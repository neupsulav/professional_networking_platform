const mongoose = require("mongoose");
const User = require("../models/user");
const Company = require("../models/company");
const Applicant = require("../models/applicants");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const Job = require("../models/job");
const CompanyNotfication = require("../models/companyNotification");

// for user applying job
const applyJob = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid Job Id", 400));
  }

  const jobId = req.params.id;
  const userId = req.user.userId;
  const { name, email, phone } = req.body;

  //   check if user has linked cv on his/her profile
  const ifCvLinked = await User.findById({ _id: userId });

  if (!ifCvLinked.cv) {
    return next(new ErrorHandler("User has no cv linked", 404));
  }

  const newApplication = await Applicant.create({
    job: jobId,
    user: userId,
    name: name,
    email: email,
    phone: phone,
  });

  newApplication.save();

  // to push the notification
  const job = await Job.findById(jobId);
  const company = await Company.findById(job.company);

  const createNotification = await CompanyNotfication.create({
    company: company._id,
    content: `${name} applied to job vacancy for ${job.position}`,
    job: job._id,
  });

  createNotification.save();

  // return response
  res.status(201).send(newApplication);
});

// to get all the applicants
const getApplicants = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid Job Id", 400));
  }

  const jobId = req.params.id;

  const applicants = await Applicant.find({ job: jobId }).populate({
    path: "user",
    select: "cv image",
  });

  res.status(200).send(applicants);
});

module.exports = { applyJob, getApplicants };
