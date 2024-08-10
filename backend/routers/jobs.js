const express = require("express");
const router = express.Router();
const companyAuthentication = require("../middlewares/companyAuthentication");
const userAuthentication = require("../middlewares/userAuthentication");

const { createJob, getJobs } = require("../controllers/jobs");

// routes
router.post("/createjob", companyAuthentication, createJob);

router.get("/getjobs", userAuthentication, getJobs);

module.exports = router;
