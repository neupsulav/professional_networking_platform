const express = require("express");
const router = express.Router();

const companyAuthentication = require("../middlewares/companyAuthentication");
const userAuthentication = require("../middlewares/userAuthentication");

const {
  getCompanySelfProfileDetails,
  getOtherCompanyProfileDetails,
} = require("../controllers/company");

// routes
router.get(
  "/getcompanyselfprofile",
  companyAuthentication,
  getCompanySelfProfileDetails
);

router.get(
  "/getothercompanyprofile/:id",
  userAuthentication,
  getOtherCompanyProfileDetails
);

module.exports = router;
