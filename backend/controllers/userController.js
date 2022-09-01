const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return next(new ErrorHandler("User already exist", 200));
  const user = new User(req.body);
  await user.save();
  res.status(201).send({
    success: true,
    message: "User resgistered successfully",
    user,
  });
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } else {
    return next(new ErrorHandler("User not found", 404));
  }
});
