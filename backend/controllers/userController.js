const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.create({
    email,
    password,
  });
  // sendToken(user, 201, res);
  res.status(201).json({
    success: true,
    message: "User resgistered successfully",
    newUser,
  });
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({
    email: email,
    password: password,
  });
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  } else {
    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: user,
    });
  }
  // const isPasswordMatched = await user.comparePassword(password);
  // if (!isPasswordMatched) {
  //   return next(new ErrorHandler("Invalid email or password", 401));
  // }
  // sendToken(user, 200, res);
});
