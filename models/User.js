const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    min: 12,
    max: 255,
  },
  phone: {
    type: String,
    min: 7,
    max: 12,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
