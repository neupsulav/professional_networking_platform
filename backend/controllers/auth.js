const User = require("../models/user");
const Company = require("../models/company");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const { sendVerificationMailUser } = require("./userEmailVerification");
const { sendVerificationMailCompany } = require("./companyEmailVerification");

// user registration
const userRegistration = catchAsync(async (req, res, next) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !phone || !email || !password || !cpassword) {
    return next(new ErrorHandler("Please fill all the fields properly", 400));
  }

  if (password != cpassword) {
    return next(new ErrorHandler("Passowrd's doesn't match", 406));
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const newUser = await User.create({
    name,
    email,
    phone,
    password,
    cpassword,
  });

  newUser.save();

  // send verification mail
  sendVerificationMailUser(req.body.name, req.body.email, newUser._id);

  if (!newUser) {
    return next(new ErrorHandler("Something went wrong", 500));
  }

  res.status(201).send(newUser);
});

// company registration
const companyRegistration = catchAsync(async (req, res, next) => {
  const { name, email, password, cpassword, phone } = req.body;

  if (!name || !email || !password || !cpassword || !phone) {
    return next(new ErrorHandler("Please fill all the fields properly", 400));
  }

  if (password != cpassword) {
    return next(new ErrorHandler("Passowrd's doesn't match", 406));
  }

  const userExists = await Company.findOne({ email: email });

  if (userExists) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const newUser = await Company.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    cpassword: req.body.cpassword,
  });
  newUser.save();

  if (!newUser) {
    return next(
      new ErrorHandler("Something went wrong, company not created!", 500)
    );
  }

  // send verification mail
  sendVerificationMailCompany(req.body.name, req.body.email, newUser._id);

  res.status(201).json({
    success: true,
    msg: "An email has been sent. Please verify your account.",
  });
});

// login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the credentials", 400));
  }

  //   to determine if the credentials are of a user or a company
  const isUser = await User.findOne({ email: email });
  const isCompany = await Company.findOne({ email: email });

  if (isUser) {
    if (!isUser.isVerified) {
      return next(
        new ErrorHandler("Email is not verified. Please verify your email", 406)
      );
    }

    // comparing hashed password
    const comparePassword = await isUser.comparePassword(password);

    if (!comparePassword) {
      return next(new ErrorHandler("Invalid user credentials", 401));
    }

    const token = await isUser.getJwt();

    return res.status(200).json({
      msg: "Logged in successfully",
      token: token,
      accountType: isUser.accountType,
    });
  }

  if (isCompany) {
    if (!isCompany.isVerified) {
      return next(
        new ErrorHandler("Email is not verified. Please verify your email", 406)
      );
    }

    // comparing hashed password
    const comparePassword = await isCompany.comparePassword(password);

    if (!comparePassword) {
      return next(new ErrorHandler("Invalid user credentials", 401));
    }

    const token = await isCompany.getJwt();

    return res.status(200).json({
      msg: "Logged in successfully",
      token: token,
      accountType: isCompany.accountType,
    });
  }

  return next(new ErrorHandler("Invalid Credentials", 401));
});

module.exports = { userRegistration, companyRegistration, login };
