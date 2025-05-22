const userValidator = require("../validations/user.validation");
const { responseStatus } = require("../global/response");
const { verifyToken } = require("../utils/verifyToken");
const { _tokenSecret } = require("../global/secretKey");
const WalletValidation = require("../validations/wallet.validation");
const authService = require("../services/auth.service");
const validateUserData = async (req, res, next) => {
  try {
    const value = await userValidator.validateAsync(req.body, {
      abortEarly: false,
    });

    req.user = value;
    next();
  } catch (error) {
    const errorDetail = error.details.map((err) => err.message).join(",");
    return responseStatus(res, 422, "failed", errorDetail);
  }
};

const authorization = async (req, res, next) => {
  const authorizationToken = req.headers["token"];
  if (!authorizationToken) {
    return responseStatus(res, 401, "failed", "Invalid authorization!");
  }
  try {
    const verified = await verifyToken(authorizationToken, _tokenSecret);
    if (!verified) {
      return responseStatus(res, 403, "failed", "You do not have access!");
    }
    const payload = {
      roles: verified.payload.roles,
    };
    req.user = payload;
    next();
  } catch (error) {
    return responseStatus(res, 403, "failed", "Failed to authenticate token.");
  }
};

const validateOTP = async (req, res, next) => {
  const { otp, wallet } = req.body;
  let verifyOTP = await authService.verifyOTP(otp);
  if (!verifyOTP) {
    return responseStatus(res, 400, "failed", "OTP is required");
  }
  next();
};

const validateWallet = async (req, res, next) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return responseStatus(res, 400, "failed", "Wallet address is required");
    }

    if (!WalletValidation.validateWalletFormat(wallet)) {
      return responseStatus(
        res,
        400,
        "failed",
        "Invalid wallet address format"
      );
    }

    if (!WalletValidation.isValidEthereumAddress(wallet)) {
      return responseStatus(res, 400, "failed", "Invalid Ethereum address");
    }

    const normalizedAddress = WalletValidation.normalizeAddress(wallet);
    if (!normalizedAddress) {
      return responseStatus(
        res,
        400,
        "failed",
        "Invalid wallet address checksum"
      );
    }

    req.body.wallet = normalizedAddress;

    next();
  } catch (error) {
    return responseStatus(
      res,
      500,
      "failed",
      "Error validating wallet address"
    );
  }
};

module.exports = {
  validateUserData,
  authorization,
  validateWallet,
};
