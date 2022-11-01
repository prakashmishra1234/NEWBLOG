const mongoose = require("mongoose");
Schema = mongoose.Schema;

const tokenSchema = Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Token", tokenSchema);
