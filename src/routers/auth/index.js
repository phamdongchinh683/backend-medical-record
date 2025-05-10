// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/Auth");
const {
  validateUserData,
  validateWallet,
} = require("../../middlewares/auth.middleware");

router.post("/register", validateUserData, AuthController.register);
router.post("/sign-in", validateWallet, AuthController.signIn);

module.exports = router;
