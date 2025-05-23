const { responseStatus } = require("../../global/response");
const authService = require("../../services/auth.service");
const requestService = require("../../services/request.service");

class AuthController {
  async register(req, res) {
    try {
      await authService.insert(req.user, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async signIn(req, res) {
    const { wallet } = req.body;
    try {
      await authService.signInAccount(wallet, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async findUserByNationalId(req, res) {
    try {
      const { nationalId } = req.params;
      if (!nationalId) {
        return responseStatus(res, 400, "failed", "National ID is required");
      }
      if (nationalId.length < 10) {
        return responseStatus(
          res,
          400,
          "failed",
          "National ID must be at least 10 characters"
        );
      }

      await authService.findUserByNationalId(nationalId, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async findUserByWallet(req, res) {
    const { wallet } = req.params;
    try {
      if (!wallet) {
        return responseStatus(res, 400, "failed", "Wallet is required");
      }
      if (wallet.length < 20) {
        return responseStatus(
          res,
          400,
          "failed",
          "Wallet must be at least 20 characters"
        );
      }
      await authService.findUserByWallet(wallet, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async getAllRequests(req, res) {
    try {
      let reqList = await requestService.getAllRequestsByPatientId(req.user.id);
      if (reqList.length > 0) {
        responseStatus(res, 200, "success", reqList);
      } else {
        responseStatus(res, 400, "failed", "Empty request");
      }
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AuthController();
