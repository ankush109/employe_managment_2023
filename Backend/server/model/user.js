const mongoose = require("mongoose");
const validator = require("validator");
var User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user", // Set a default role of "user"
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  { collection: "Userdbs" }
);

const Userdb = mongoose.model("Userdb", User);
module.exports = Userdb;
