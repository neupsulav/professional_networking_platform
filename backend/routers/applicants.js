const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const { applyJob } = require("../controllers/applicants");

// routes
router.post("/applyjob/:id", userAuthentication, applyJob);

module.exports = router;
