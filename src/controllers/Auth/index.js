const { responseStatus } = require("../../global/response");
const authService = require("../../services/auth.service");

class AuthController {
  async register(req, res) {
    try {
      await authService.insert(req.user, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async getDoctor(req, res) {
    try {
      await authService.getDoctor(res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async findUserByNationalId(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return responseStatus(res, 400, "failed", "National ID is required");
      }
      if (id.length < 10) {
        return responseStatus(
          res,
          400,
          "failed",
          "National ID must be at least 10 characters"
        );
      }

      await authService.findUserByNationalId(id, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async findUserByWallet(req, res) {
    try {
      const { wallet } = req.params.wallet;
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
}

module.exports = new AuthController();
