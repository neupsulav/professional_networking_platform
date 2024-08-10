const mongoose = require("mongoose");
const Job = require("./job");
const User = require("./user");

const applicantsSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Job,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Application", applicantsSchema);
