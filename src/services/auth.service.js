const { responseStatus } = require("../global/response");
const userModel = require("../models/user.model");

class AuthService {
  async insert(data, res) {
    let exitRoleWallet = await userModel.findOne({ wallet: data.wallet });

    if (exitRoleWallet) {
      if (exitRoleWallet.role.includes(data.role)) {
        return responseStatus(
          res,
          400,
          "failed",
          `Role '${data.role}' already exists for this wallet`
        );
      }
      exitRoleWallet.role.push(data.role);
      await exitRoleWallet.save();
      return responseStatus(
        res,
        200,
        "success",
        `You register with role ${data.role}`
      );
    }

    let insertUser = await userModel.create({
      wallet: data.wallet,
      fullName: data.fullName,
      role: [data.role],
      nationalId: data.nationalId,
      phone: data.phone,
      email: data.email,
    });

    if (insertUser) {
      return responseStatus(res, 200, "success", "Signup successful");
    }
  }

  async findUserByNationalId(id, res) {
    const user = await userModel.findOne({ nationalId: id });
    if (!user) {
      return responseStatus(res, 404, "failed", "user not found");
    }
    return responseStatus(res, 200, "success", user);
  }

  async getDoctor(res) {
    const result = await userModel.find({ role: "doctor" });
    if (!result) {
      return responseStatus(res, 400, "failed", "Currently no doctor");
    }
    return responseStatus(res, 200, "success", result);
  }

  async findUserByWallet(wallet, res) {
    const user = await userModel.findOne({ wallet: wallet });
    if (!user) {
      return responseStatus(res, 404, "failed", "user not found");
    }
    return responseStatus(res, 200, "success", user);
  }
}

module.exports = new AuthService();
