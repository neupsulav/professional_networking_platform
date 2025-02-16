const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Company = require("./company");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: String,
    enum: ["user", "company"],
    default: "user",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following_company: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Company,
    },
  ],
  position: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  skills: {
    type: [String],
  },
  cv: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hashing the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.cpassword = " ";
  next();
});

// comparing password
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.methods.getJwt = async function () {
  const token = jwt.sign(
    {
      userImage: this.image,
      userId: this._id,
      name: this.name,
      username: this.username,
    },
    process.env.secretKey,
    {
      expiresIn: process.env.expiresIn,
    }
  );

  return token;
};

//   exporting the user schema
module.exports = mongoose.model("User", userSchema);
