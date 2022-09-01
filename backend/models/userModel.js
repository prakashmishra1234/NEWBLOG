const mongoose = require("mongoose");
Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = Schema({
  email: {
    type: String,
    // required: true,
    required: [true, "Please enter your email"],
    // unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    // required: true,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should contain minimum 8 character"],
    // select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// // Compare Password
// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model("User", userSchema);
