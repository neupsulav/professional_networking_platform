const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/post");

const userAuthentication = require("../middlewares/userAuthentication");

// routes
router.post("/createpost", userAuthentication, createPost);

module.exports = router;
