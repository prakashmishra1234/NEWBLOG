const mongoose = require("mongoose");
Schema = mongoose.Schema;

const postSchema = Schema({
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  title: {
    type: String,
    trim: true,
    required: true,
  },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  ],
  numoflikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  numofcomments: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Posts", postSchema);
