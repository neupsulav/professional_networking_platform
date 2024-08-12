const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const Company = require("../models/company");
const Job = require("../models/job");

// get company self profile details
const getCompanySelfProfileDetails = catchAsync(async (req, res, next) => {
  const companyId = req.user.companyId;

  const company = await Company.findById({ _id: companyId }).populate({
    path: "followers",
    select: "name email position username image _id",
  });

  const followersCount = company.followers.length;

  const companyJobs = await Job.find({ company: companyId });

  res.status(200).send({ company, followersCount, companyJobs });
});

const getOtherCompanyProfileDetails = catchAsync(async (req, res, next) => {
  const companyId = req.params.id;

  const company = await Company.findById({ _id: companyId });

  //   to check if user is following the company
  let isFollowing = false;
  if (company.followers.includes(req.user.userId)) {
    isFollowing = true;
  }

  const companyDetails = await company.populate({
    path: "followers",
    select: "name email position username image _id",
  });

  const followersCount = company.followers.length;

  const companyJobs = await Job.find({ company: companyId });

  res
    .status(200)
    .send({ companyDetails, followersCount, companyJobs, isFollowing });
});

module.exports = {
  getCompanySelfProfileDetails,
  getOtherCompanyProfileDetails,
};
