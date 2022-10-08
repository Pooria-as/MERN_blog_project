const config = require("config");
const mongoose = require("mongoose");

const database = config.get("MongoDBurl");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected successfully to database ✔ ");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
