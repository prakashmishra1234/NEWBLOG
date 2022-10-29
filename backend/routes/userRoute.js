const express = require("express");
const auth = require("../middleware/auth");
const {
  loginUser,
  registerUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getuserdata").get(auth, getUser);

module.exports = router;
