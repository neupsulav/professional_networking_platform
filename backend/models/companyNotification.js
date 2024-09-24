const mongoose = require("mongoose");
const Company = require("./company");
const Job = require("./job");
const User = require("./user");

const companyNotificationSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Company,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Job,
  },
  currentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

module.exports = mongoose.model(
  "CompanyNotification",
  companyNotificationSchema
);
