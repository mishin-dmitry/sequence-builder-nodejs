const { Router } = require("express");

const { signup, login, logout } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares");

const router = Router();

router.post("/signup", signup);
router.post("/login", verifyToken, login);
router.post("/logout", logout);

module.exports = router;
