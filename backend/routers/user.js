const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const {
  userProfileData,
  selfProfileData,
  updateUserProfile,
} = require("../controllers/user");

// routes
router.get("/user/:id", userAuthentication, userProfileData);

router.get("/selfuser", userAuthentication, selfProfileData);

router.patch("/updateuser", userAuthentication, updateUserProfile);

module.exports = router;
