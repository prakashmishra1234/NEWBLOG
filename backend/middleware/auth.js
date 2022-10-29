// const ErrorHandler = require("../utils/errorhandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return next(new ErrorHandler("Please login to access this resource", 401));
//   }
//   const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decodedData.id);
//   next();
// });

// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return next(
//           new ErrorHandler(
//             `Role: ${req.user.role} is not allowed to access this resouce `,
//             403
//           )
//         );
//       }
//       next();
//     };
//   };

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req?.headers?.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (user) {
      req.body.user = user;
      next();
    } else {
      res
        .status(404)
        .send({ success: false, message: "User not found", data: null });
    }
  } else {
    res
      .status(400)
      .send({
        success: false,
        message: "Authorization is required",
        data: null,
      });
  }
};
