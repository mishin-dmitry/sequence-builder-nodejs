const { Router } = require("express");

const {
  signup,
  login,
  logout,
  requestResetPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const { verifyToken } = require("../middlewares");

const router = Router();

router.post("/signup", signup);
router.post("/login", verifyToken, login);
router.post("/logout", logout);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
