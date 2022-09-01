const express = require("express");
const {
  getAllPosts,
  createPosts,
  updatepost,
  deletePost,
  postDetails,
} = require("../controllers/postController");

const router = express.Router();

router.route("/posts").get(getAllPosts);
router.route("/post/new").post(createPosts);
router.route("/post/:id").put(updatepost);
router.route("/post/delete/:id").delete(deletePost);
router.route("/post/details/:id").post(postDetails);

module.exports = router;
