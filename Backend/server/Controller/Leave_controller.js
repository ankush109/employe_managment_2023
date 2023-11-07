const Leave = require("../model/Leave_model");

exports.requestLeave = async (req, res) => {
  const { startDate, endDate, reason } = req.body;
  console.log(req.user.name, "user");
  try {
    const leave = new Leave({
      user: req.user.id, // The user's ID who is requesting the leave
      name: req.user.name ? req.user.name : "ankush",
      startDate: startDate,
      endDate: endDate,
      reason: reason,
    });

    const leaveData = await leave.save();

    // Populate the user field to include the user's dat

    res.status(201).json(leaveData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error requesting leave" });
  }
};
exports.getAllLeaveApplications = async (req, res) => {
  try {
    // Use the find method to fetch all leave applications
    const leaveApplications = await Leave.find();

    res.status(200).json(leaveApplications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching leave applications" });
  }
};
