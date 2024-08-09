const express = require("express");
const router = express.Router();

const { createPost, likePost } = require("../controllers/post");

const userAuthentication = require("../middlewares/userAuthentication");

// routes
router.post("/createpost", userAuthentication, createPost);

router.patch("/likepost/:id", userAuthentication, likePost);

module.exports = router;
