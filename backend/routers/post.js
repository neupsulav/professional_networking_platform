const express = require("express");
const router = express.Router();

const { createPost, likePost, createComment } = require("../controllers/post");

const userAuthentication = require("../middlewares/userAuthentication");

// routes
router.post("/createpost", userAuthentication, createPost);

router.patch("/likepost/:id", userAuthentication, likePost);

router.patch("/createcomment/:id", userAuthentication, createComment);

module.exports = router;
