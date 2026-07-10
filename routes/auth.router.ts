import { Router } from "express";
import {
  signup,
  login,
  logout,
  requestResetPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares";

const router = Router();

router.post("/signup", signup);
router.post("/login", verifyToken, login);
router.post("/logout", logout);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);

export = router;
