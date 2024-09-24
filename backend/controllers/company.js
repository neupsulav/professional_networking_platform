const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const Company = require("../models/company");
const Job = require("../models/job");
const CompanyNotification = require("../models/companyNotification");

// get company self profile details
const getCompanySelfProfileDetails = catchAsync(async (req, res, next) => {
  const companyId = req.user.companyId;

  const company = await Company.findById({ _id: companyId }).populate({
    path: "followers",
    select: "name email position username image _id",
  });

  const followersCount = company.followers.length;

  const companyJobs = await Job.find({ company: companyId })
    .populate({
      path: "company",
      select: "_id name image",
    })
    .sort({ createdAt: -1 });

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

  const currentDate = new Date();

  const companyJobs = await Job.find({
    company: companyId,
    deadline: { $gte: currentDate },
  })
    .populate("company")
    .sort({
      createdAt: -1,
    });

  res
    .status(200)
    .send({ companyDetails, followersCount, companyJobs, isFollowing });
});

// update company details
const updateCompanyProfile = catchAsync(async (req, res, next) => {
  const companyId = req.user.companyId;

  const file = req.file;

  if (!file) {
    const updateCompany = await Company.findByIdAndUpdate(
      { _id: companyId },
      req.body,
      {
        new: true,
      }
    );

    if (!updateCompany) {
      return next(new ErrorHandler("Something went wrong", 500));
    }

    res.status(201).send(updateCompany);
  } else {
    const filename = file.filename;
    const basepath = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/companyImages/`;

    const updateCompany = await Company.findByIdAndUpdate(
      { _id: companyId },
      { ...req.body, image: `${basepath}${filename}` },
      {
        new: true,
      }
    );

    if (!updateCompany) {
      return next(new ErrorHandler("Something went wrong", 500));
    }

    res.status(201).send(updateCompany);
  }
});

// to get company notification
const getCompanyNotification = catchAsync(async (req, res, next) => {
  const companyId = req.user.userId;

  const notifications = await CompanyNotification.find({
    company: companyId,
  }).sort({
    createdAt: -1,
  });

  res.status(200).send(notifications);
});

module.exports = {
  getCompanySelfProfileDetails,
  getOtherCompanyProfileDetails,
  updateCompanyProfile,
  getCompanyNotification,
};
