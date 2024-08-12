const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");
const companyAuthentication = require("../middlewares/companyAuthentication");

const { applyJob, getApplicants } = require("../controllers/applicants");

// routes
router.post("/applyjob/:id", userAuthentication, applyJob);

router.get("/getapplicants/:id", companyAuthentication, getApplicants);

module.exports = router;
