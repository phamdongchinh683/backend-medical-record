const {
  _cloudinaryName,
  _cloudinaryApiKey,
  _cloudinaryApiSecret,
} = require("../global/secretKey");

module.exports = {
  cloud_name: _cloudinaryName,
  api_key: _cloudinaryApiKey,
  api_secret: _cloudinaryApiSecret,
};
