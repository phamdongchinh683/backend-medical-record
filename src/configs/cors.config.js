const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  origin: process.env.CORS_ORIGIN || "*",
};
