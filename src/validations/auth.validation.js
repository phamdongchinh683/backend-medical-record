const Joi = require("joi");
const WalletValidation = require("../utils/walletValidation");

const walletSchema = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (!WalletValidation.validateWalletFormat(value)) {
      return helpers.error("wallet.invalidFormat");
    }
    if (!WalletValidation.isValidEthereumAddress(value)) {
      return helpers.error("wallet.invalidAddress");
    }
    return value;
  })
  .messages({
    "wallet.invalidFormat": "Invalid wallet address format",
    "wallet.invalidAddress": "Invalid Ethereum address",
    "any.required": "Wallet address is required",
  });

const loginValidator = Joi.object({
  wallet: walletSchema,
});

module.exports = {
  loginValidator,
  walletSchema,
};
