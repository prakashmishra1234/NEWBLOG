const Post = require("../models/postModels");

//Create Post
exports.createPosts = async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    success: true,
    post,
  });
};

//Get All Posts
exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.find();
  res.status(201).json({
    success: true,
    posts,
  });
};

//Update post
exports.updatepost = async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    res.status(500).json({
      success: false,
      message: "post not found",
    });
  }
  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "post updated",
    post,
  });
};

//Delete Post
exports.deletePost = async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    res.status(500).json({
      success: false,
      message: "Post not found",
    });
  }
  await post.remove();
  res.status(200).json({
    success: true,
    message: "Post Deleted Successfully",
  });
};
