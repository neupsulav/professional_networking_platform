const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const { followOther, checkFollowing } = require("../controllers/follow");

// routes
router.patch("/follow/:id", userAuthentication, followOther);

router.get("/checkfollowing/:id", userAuthentication, checkFollowing);

module.exports = router;
