const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const { getJobRecommendations } = require("../controllers/jobRecommendations");

router.get("/getjobrecommendations", userAuthentication, getJobRecommendations);

module.exports = router;
