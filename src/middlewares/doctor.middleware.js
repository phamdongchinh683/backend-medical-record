const { responseStatus } = require("../global/response");

class DoctorMiddleware {
  isDoctor(req, res, next) {
    const { roles } = req.user;
    if (!roles.includes("doctor")) {
      return responseStatus(
        res,
        403,
        "failed",
        "Only doctors can access this resource"
      );
    }
    next();
  }
}

module.exports = new DoctorMiddleware();
