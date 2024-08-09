const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const { userProfileData, selfProfileData } = require("../controllers/user");

// routes
router.get("/user/:id", userAuthentication, userProfileData);

router.get("/selfuser", userAuthentication, selfProfileData);

module.exports = router;
