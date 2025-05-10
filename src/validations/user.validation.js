const Joi = require("joi");
const WalletValidation = require("./wallet.validation");

const userValidator = Joi.object({
  wallet: Joi.string()
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
    }),

  fullName: Joi.string().required().messages({
    "string.base": "Name must be a string",
  }),

  role: Joi.string().valid("patient", "doctor").required().messages({
    "string.base": "Role must be a string",
    "any.required": "Role is required",
    "any.only": 'Role must be either "patient" or "doctor"',
  }),

  nationalId: Joi.string().min(12).optional().messages({
    "string.base": "National ID must be a string",
  }),

  phone: Joi.string().min(10).required().messages({
    "string.base": "Phone must be a string",
    "any.required": "Phone number is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
});

module.exports = userValidator;
