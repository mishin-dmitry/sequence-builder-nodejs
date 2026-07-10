import { Router } from "express";
import {
  createSequence,
  getSequence,
  deleteSequence,
  updateSequence,
} from "../controllers/sequence.controller";
import { verifyToken, checkUserExisting } from "../middlewares";

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createSequence);
router.get("/:id", verifyToken, checkUserExisting, getSequence);
router.delete("/:id", verifyToken, checkUserExisting, deleteSequence);
router.put("/:id", verifyToken, checkUserExisting, updateSequence);

export = router;
