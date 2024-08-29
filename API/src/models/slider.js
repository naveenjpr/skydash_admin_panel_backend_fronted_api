const mongoose = require("mongoose")

const sliderSchema = new mongoose.Schema({
  Slider_Heading: {
    type: String,
    required: [true, "Slider_Heading is required"],
    match: /^[a-zA-Z ]{2,90}$/,
  },
  Slider_SubHeading: {
    type: String,
    required: [true, "Slider_Heading is required"],
    match: /^[a-zA-Z ]{2,90}$/,
  },
  image: {
    type: String,
    required: [true, "slider Image is required"],
  },

  status: {
    type: Boolean,
    default: true,
  },
  // order: {
  //   type: Number,
  //   default: 1,
  //   min: 1,
  //   max: [1000, "Maximum limit reach"],
  // },
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

const sliderModel = mongoose.model("slider", sliderSchema)

module.exports = sliderModel
