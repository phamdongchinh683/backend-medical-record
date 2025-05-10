const { responseStatus } = require("../global/response");

module.exports = (req, res, next) => {
  const file = req.file;
  if (!file) {
    return responseStatus(res, 400, "failed", "Please not empty file", null);
  }

  if (file.mimetype !== "application/pdf") {
    return responseStatus(res, 400, "failed", "Only file PDF", null);
  }

  next();
};
