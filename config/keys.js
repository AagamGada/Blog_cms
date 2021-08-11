require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_USER: process.env.EMAIL_USER,
    JWT_SECRET: process.env.JWT_SECRET,
  };
} else {
  module.exports = {
    MONGO_URI: process.env.MONGO_DEV_URI,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_USER: process.env.EMAIL_USER,
    JWT_SECRET: process.env.JWT_SECRET,
  };
}
