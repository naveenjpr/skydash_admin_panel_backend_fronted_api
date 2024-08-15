const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "video Course name is required"],
    match: /^[a-zA-Z ]{2,90}$/,
  },

  topic: {
    type: String,
    required: [true, "video Topic is required"],
    // match: /^[a-zA-Z ]{2,90}$/,
  },
  link: {
    type: String,
    required: [true, "video Link is required"],
  },

  status: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 1,
    min: 1,
    max: [1000, "Maximum limit reach"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: "",
  },
})

const videoModel = mongoose.model("videos", videoSchema)

module.exports = videoModel
