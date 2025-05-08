const Joi = require("joi");
const userValidator = require("../validations/user.validation");
const { responseStatus } = require("../global/response");
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

module.exports = validateUserData;
