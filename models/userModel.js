const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  image: {
    type: String,
  },
  type: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
