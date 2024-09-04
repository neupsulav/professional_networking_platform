const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const { followCompany, isFollowing } = require("../controllers/followCompany");

// routes
router.patch("/follow/company/:id", userAuthentication, followCompany);

router.get("/isfollowingcompany/:id", userAuthentication, isFollowing);

module.exports = router;
