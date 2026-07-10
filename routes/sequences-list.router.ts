import { Router } from "express";
import { getUserSequences } from "../controllers/sequence.controller";
import { verifyToken, checkUserExisting } from "../middlewares";

const router = Router();

router.get("/my", verifyToken, checkUserExisting, getUserSequences);

export = router;
