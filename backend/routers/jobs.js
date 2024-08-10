const express = require("express");
const router = express.Router();
const companyAuthentication = require("../middlewares/companyAuthentication");

const { createJob } = require("../controllers/jobs");

// routes
router.post("/createjob", companyAuthentication, createJob);

module.exports = router;
