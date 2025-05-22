const { _socketOrigin } = require("../global/secretKey");

module.exports = {
  cors: {
    origin: _socketOrigin,
  },
};
