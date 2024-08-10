const express = require("express");
const router = express.Router();

const userAuthentication = require("../middlewares/userAuthentication");

const { getNotifications } = require("../controllers/notifications");

// routes
router.get("/notifications", userAuthentication, getNotifications);

module.exports = router;
