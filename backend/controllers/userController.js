const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/tokenSchema");

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  let { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorHandler("User already exist", 200));
  const salt = await bcrypt.genSalt(10);
  const hashdePAssword = await bcrypt.hash(password, salt);
  password = hashdePAssword;
  const user = await new User({ name, email, password });
  const newUser = await user.save();
  const hashedtext = bcrypt.hashSync(newUser._id.toString(), 10);
  const ClickableToken = new Token({ userid: newUser._id, token: hashedtext });
  await ClickableToken.save();
  const emailtext = `<div><h3>Click on the below link to verify your email</h3> <a href="http://localhost:3000/verifyemail/${hashedtext}">Click here for verification</a></div>`;
  const mailOptions = {
    email: email,
    subject: "Email Verification",
    emailcontent: emailtext,
  };
  await sendEmail(mailOptions);
  res.status(201).send({
    success: true,
    message: "User verification mail sent",
    data: newUser,
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
    const dataToBeSent = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(dataToBeSent, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } else {
    res.status(404).json({
      success: "false",
      message: "Username or password is incorrect!",
      data: null,
    });
  }
});

exports.verifyemail = catchAsyncError(async (req, res, next) => {
  const token = await Token.findOne({ token: req.body.token });
  if (token) {
    const data = await User.findOneAndUpdate({
      _id: token.userid,
      isVerified: true,
    });
    res.status(201).json({
      success: true,
      message: "Email validation successfull",
      data: data,
    });
  } else {
    return next(new ErrorHandler("Invalid token", 404));
  }
});

exports.getUser = catchAsyncError(async (req, res, next) => {
  const { email } = req.body.user;
  const UserData = await User.findOne({ email });
  if (UserData) {
    res
      .status(200)
      .json({ success: true, message: "User found", data: UserData });
  } else {
    return next(new ErrorHandler("User not found", 404));
    // res.status(404).json({
    //   success: false,
    //   message: "user not found",
    //   data: null,
    // });
  }
});
