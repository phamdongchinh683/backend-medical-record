const { responseStatus } = require("../global/response");

class PatientMiddleware {
  isPatient(req, res, next) {
    const { roles } = req.user;
    if (!roles.includes("patient")) {
      return responseStatus(res, 401, "failed", "Only patients can access this resource");
    }
    console.log(req.user)
    next();
  }
}

module.exports = new PatientMiddleware();
