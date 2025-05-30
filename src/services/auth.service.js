const { responseStatus } = require("../global/response");
const { _tokenSecret, _tokenLife } = require("../global/secretKey");
const otpModel = require("../models/otp.model");
const userModel = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");
class AuthService {
  async insert(data, res) {
    let exitRoleWallet = await userModel
      .findOne({ wallet: data.wallet })
      .lean()
      .exec();

    if (exitRoleWallet) {
      if (exitRoleWallet.role.includes(data.role)) {
        return responseStatus(
          res,
          400,
          "failed",
          `Role '${data.role}' already exists for this wallet`
        );
      }

      await userModel.updateOne(
        { wallet: data.wallet },
        { $push: { role: data.role } }
      );
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
    const user = await userModel
      .findOne({ nationalId: id }, { wallet: 1, _id: 1, fullName: 1 })
      .lean()
      .exec();
    if (!user) {
      return responseStatus(res, 404, "failed", "user not found");
    }
    return responseStatus(res, 200, "success", user);
  }

  async getDoctor(res) {
    const result = await userModel
      .find({ role: "doctor" }, { wallet: 1, _id: 1, fullName: 1 })
      .lean()
      .exec();
    if (!result) {
      return responseStatus(res, 400, "failed", "Currently no doctor");
    }
    return responseStatus(res, 200, "success", result);
  }

  async getDoctorById(id, res) {
    const result = await userModel
      .findOne({ _id: id, role: "doctor" })
      .lean()
      .exec();

    if (!result) {
      return responseStatus(res, 400, "failed", "Currently no doctor");
    }
    return responseStatus(res, 200, "success", result);
  }

  async findUserByWallet(wallet, res) {
    const user = await userModel
      .findOne({ wallet: wallet }, { wallet: 1, _id: 1, fullName: 1 })
      .lean()
      .exec();
    if (!user) {
      return responseStatus(res, 404, "failed", "user not found");
    }
    return responseStatus(res, 200, "success", user);
  }

  async signInAccount(wallet, res) {
    let user = await userModel.findOne({ wallet }).lean().exec();
    if (!user) {
      return responseStatus(
        res,
        400,
        "failed",
        "User not found, please register"
      );
    }
    
    let data = { roles: user.role, id: user._id };
    let accessToken = await generateToken(data, _tokenSecret, _tokenLife);
    return responseStatus(res, 200, "success", {
      token: accessToken,
    });
  }

  async findAllPatient(res) {
    let result = await userModel
      .find({ role: "patient" }, { wallet: 1, _id: 1, fullName: 1 })
      .lean()
      .exec();
    if (!result) {
      return responseStatus(res, 400, "failed", "Currently no patient");
    }
    return responseStatus(res, 200, "success", result);
  }

  async findPatientById(id, res) {
    let result = await userModel
      .findOne({ _id: id, role: "patient" })
      .lean()
      .exec();
    if (!result) {
      return responseStatus(res, 400, "failed", "Currently no patient");
    }
    return responseStatus(res, 200, "success", result);
  }

  async verifyOTP(otp, wallet, res) {
    let checkOtp = await otpModel.findOne({ otp: otp }).lean().exec();
    if (!checkOtp) {
      return responseStatus(res, 400, "failed", "OTP is invalid");
    }
    return responseStatus(res, 200, "success", otp);
  }
}

module.exports = new AuthService();
