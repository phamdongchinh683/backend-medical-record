const { responseStatus } = require("../../global/response");
const authService = require("../../services/auth.service");
class PatientController {
  async getPatient(req, res) {
    try {
      await authService.findAllPatient(res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async getPatientById(req, res) {
    const { id } = req.params;
    if (!id) {
      return responseStatus(res, 400, "failed", "Patient ID is required");
    }
    try {
      await authService.findPatientById(id, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}
module.exports = new PatientController();
