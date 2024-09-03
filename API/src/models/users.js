const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    match: /^[a-zA-Z ]{2,90}$/,
  },
  email: {
    type: String,
    required : [true, 'email is required'],
  },
  mobile_number: {
    type: Number,
    required: [true, "mobile_number is required"],
    match: /^[0-9]{1,15}$/,
  },
  password: {
    type: String,
    required: [true, "password is required"],
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

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
