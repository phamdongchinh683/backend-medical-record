const { responseStatus } = require("../../global/response");
const authService = require("../../services/auth.service");

class DoctorController {
 async getDoctor(req, res) {
  try {
    await authService.getDoctor(res);
  } catch (e) {
    responseStatus(res, 400, "failed", e.message);
  }
}

 async getDoctorById(req, res) {
  const { id } = req.params;
  if (!id) { 
    return responseStatus(res, 400, "failed", "Doctor ID is required");
  }
  try {
    await authService.getDoctorById(id, res);
  } catch (e) {
    responseStatus(res, 400, "failed", e.message);
  }
}


}

module.exports = new DoctorController();