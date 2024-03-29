const mongoose = require("mongoose");

const ConnectToMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB Connected: ${connect.connection.host}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

module.exports = ConnectToMongoDB;
