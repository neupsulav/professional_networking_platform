const express = require("express");
const router = express.Router();

const {
  createPost,
  likePost,
  createComment,
  getPost,
  getLikesCount,
  getComments,
  getSinglePost,
} = require("../controllers/post");

const userAuthentication = require("../middlewares/userAuthentication");

// routes
router.post("/createpost", userAuthentication, createPost);

router.patch("/likepost/:id", userAuthentication, likePost);

router.patch("/createcomment/:id", userAuthentication, createComment);

router.get("/posts", userAuthentication, getPost);

router.get("/getlikescount/:id", userAuthentication, getLikesCount);

router.get("/getcomments/:id", getComments);

router.get("/getsinglepost/:id", userAuthentication, getSinglePost);

module.exports = router;
