const { responseStatus } = require("../global/response");
const userModel = require("../models/user.model");

class AuthService {
  async insert(data, res) {
    let insertUser = await userModel.create({
      wallet: data.wallet,
      name: data.name,
      role: data.role,
      nationalId: data.nationalId,
      phone: data.phone,
      email: data.email,
    });

    if (insertUser) {
      return responseStatus(res, 200, "success", "Signup successful");
    }
  }

  async findUserByNationalId(id, res) {
    const patient = await userModel.findOne({ nationalId: id });
    if (!patient) {
      return responseStatus(res, 404, "error", "user not found");
    }
    return responseStatus(res, 200, "success", patient.wallet);
  }
}

module.exports = new AuthService();
