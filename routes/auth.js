const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth");
const {
  validateAuthRegister,
  validateAuthLogin,
} = require("../config/validator");
const authMiddleware = require("../config/auth");

/**
 * @route /api/auth/register
 */
router.post("/register", validateAuthRegister, AuthController.registerUser);

/**
 * @route /api/auth/login
 */
router.post("/login", validateAuthLogin, AuthController.loginUser);

/**
 * @route /api/auth/user
 */
router.get("/user", authMiddleware, AuthController.fetchUser);
module.exports = router;
