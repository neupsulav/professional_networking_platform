const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
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
    default: "company",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  employees: {
    type: String,
  },
  industry: {
    type: String,
  },
  overview: {
    type: String,
  },
  services: {
    type: String,
  },
  phone: {
    type: String,
  },
});

//hashing the password
companySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.cpassword = " ";
  next();
});

// comparing password
companySchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

companySchema.methods.getJwt = async function () {
  const token = jwt.sign(
    {
      userImage: this.image,
      userId: this._id,
      name: this.name,
    },
    process.env.secretKey,
    {
      expiresIn: process.env.expiresIn,
    }
  );

  return token;
};

//   exporting the user schema
module.exports = mongoose.model("Company", companySchema);
