const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorHandler("User already exist", 200));
  const user = new User({ email, password });
  await user.save();
  res.status(201).send({
    success: true,
    message: "User resgistered successfully",
    user,
  });
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please enter email and password", 404));
  const user = await User.findOne({ email, password });
  //const isPasswordMatched = await user.comparePassword(password);
  // if (!isPasswordMatched) {
  //   return next(new ErrorHandler("Invalid email or password", 401));
  // }
  // if (!user) return next(new ErrorHandler("Invalid email or password", 404));
  if (!user) {
    res.status(200).send({
      success: false,
      message: "Invalid username or password",
      data: null,
    });
  }
  res.status(200).send({
    success: true,
    message: "User logged in successfully",
    data: user,
  });
});
