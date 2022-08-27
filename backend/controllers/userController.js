const User = require("../models/userModel");

//create user
exports.register = async (req, res, next) => {
  try {
    const newUser = await new User(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User resgistered successfully",
      newUser,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//login user
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      res.status(200).json({
        success: true,
        message: "user logged in successfully",
        data: user,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "user not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
