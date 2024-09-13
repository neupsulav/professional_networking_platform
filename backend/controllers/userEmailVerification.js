const nodemailer = require("nodemailer");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const User = require("../models/user");

// email generation
const sendVerificationMailUser = catchAsync(async (name, email, userid) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Email verification",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #5bb7a8;
            color: white;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content a{
        color : white;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #5bb7a8;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Email Verification</h2>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Thank you for signing up. Please click the button below to verify your email address.</p>
            <a href='http://localhost:3000/api/user/verify/${userid}' class="button">Click here to verify</a>
        </div>
        
    </div>
</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent:", info.response);
    }
  });
});

//   email verification
const userEmailVerification = catchAsync(async (req, res, next) => {
  const updateInfo = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isVerified: true } }
  );
  // res
  //   .status(200)
  //   .send("Your email has been verified. You can now login to your account.");
  res.redirect("http://localhost:3001/login");
});

module.exports = { sendVerificationMailUser, userEmailVerification };
