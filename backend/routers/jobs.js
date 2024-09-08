const express = require("express");
const router = express.Router();
const companyAuthentication = require("../middlewares/companyAuthentication");
const userAuthentication = require("../middlewares/userAuthentication");

const { createJob, getJobs, appliedJobs } = require("../controllers/jobs");

// routes
router.post("/createjob", companyAuthentication, createJob);

router.get("/getjobs", userAuthentication, getJobs);

router.get("/getappliedjobs", userAuthentication, appliedJobs);

module.exports = router;
