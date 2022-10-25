const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const bcrypt = require("bcrypt");

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  let { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorHandler("User already exist", 200));
  const salt = await bcrypt.genSalt(10);
  const hashdePAssword = await bcrypt.hash(password, salt);
  password = hashdePAssword;
  const user = await new User({ name, email, password });
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
  const user = await User.findOne({ email });
  if (!user) {
    res.status(200).send({
      success: false,
      message: "User does not exists",
      data: null,
    });
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (isPasswordMatched) {
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } else {
    res.status(200).json({
      success: "false",
      message: "Username or password is incorrect!",
      data: null,
    });
  }
});
