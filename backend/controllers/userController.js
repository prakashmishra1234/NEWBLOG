const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//create user
exports.register = catchAsyncError(async (req, res, next) => {
  const newUser = await new User(req.body);
  await newUser.save();
  res.status(201).json({
    success: true,
    message: "User resgistered successfully",
    newUser,
  });
});

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: user,
    });
  }
});
