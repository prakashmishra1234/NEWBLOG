const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

//Register a user
exports.registerUser = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(200).send({
      success: false,
      message: "User already exists",
      data: null,
    });
  const user = new User(req.body);
  await user.save();
  try {
    res.status(201).send({
      success: true,
      message: "User resgistered successfully",
      user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  try {
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
      res.status(200).send({
        success: false,
        message: "User login failed",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
