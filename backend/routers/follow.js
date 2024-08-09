const express = require("express");
const router = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");

const { followOther } = require("../controllers/follow");

// routes
router.patch("/follow/:id", userAuthentication, followOther);

module.exports = router;
