const { _corsOrigin } = require("../global/secretKey");

module.exports = {
  origin: _corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
