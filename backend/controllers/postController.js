const Post = require("../models/postModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create Post
exports.createPosts = catchAsyncError(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    success: true,
    post,
  });
});

//Get All Posts
exports.getAllPosts = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find();
  res.status(201).json({
    success: true,
    posts,
  });
});

//Update post
exports.updatepost = catchAsyncError(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorHandler("Post not found", 404));
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
});

//Delete Post
exports.deletePost = catchAsyncError(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorHandler("Post not found", 404));
  await post.remove();
  res.status(200).json({
    success: true,
    message: "Post Deleted Successfully",
  });
});
