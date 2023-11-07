const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Userdb", // Reference to the User model to associate the leave with a user
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
