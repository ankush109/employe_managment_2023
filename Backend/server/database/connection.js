const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ankush:ankush2003@ankush.9quzp.mongodb.net/hr"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
