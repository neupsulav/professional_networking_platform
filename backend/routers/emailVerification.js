const express = require("express");
const router = express.Router();

const {
  userEmailVerification,
} = require("../controllers/userEmailVerification");

const {
  companyEmailVerification,
} = require("../controllers/companyEmailVerification");

//routes
router.get("/user/verify/:id", userEmailVerification);

router.get("/company/verify/:id", companyEmailVerification);

module.exports = router;
