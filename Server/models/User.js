const mongoose = require("mongoose");
var moment = require("moment");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    default: 100,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    default: moment().format("MMM Do YYYY"),
  },
});

const Users = mongoose.model("Users", UserSchema);

exports.Users  = Users ;