const mongoose = require("mongoose");
const keys = require("./keys");

async function dbConnect() {
  try {
    await mongoose.connect("mongodb+srv://aagam27:c5HAeHpi7dMfMWY@cluster0.dwi3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (err) {
    console.log("DB Failed to connect");
    process.exit(1);
  }
}

module.exports = dbConnect;
