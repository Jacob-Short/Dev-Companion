const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// connect to mongodb database with mongoose
const connectDB = async () => {
  try {
    // since mongoose.conn returns a proimse,
    // we add await in front
    await mongoose.connect(db, {
        useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
