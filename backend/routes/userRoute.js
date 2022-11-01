const express = require("express");
const auth = require("../middleware/auth");
const {
  loginUser,
  registerUser,
  verifyemail,
  getUser,
} = require("../controllers/userController");
const { validateRegister, SignupSchema } = require("../utils/validation");

const router = express.Router();

router.route("/register").post(validateRegister(SignupSchema), registerUser);
router.route("/login").post(loginUser);
router.route("/verifyemail").post(verifyemail);
router.route("/getuserdata").get(auth, getUser);

module.exports = router;
