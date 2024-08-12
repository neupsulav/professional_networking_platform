const express = require("express");
const router = express.Router();

const companyAuthentication = require("../middlewares/companyAuthentication");
const userAuthentication = require("../middlewares/userAuthentication");

const { getCompanySelfProfileDetails } = require("../controllers/company");

// routes
router.get(
  "/getcompanyselfprofile",
  companyAuthentication,
  getCompanySelfProfileDetails
);

module.exports = router;
