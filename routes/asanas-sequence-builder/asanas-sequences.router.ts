import { Router } from "express";
import {
  createSequence,
  getSequence,
  updateSequence,
  deleteSequence,
  getUserSequences,
} from "../../controllers/asanas-sequence-builder/sequence.controller";
import { verifyToken, checkUserExisting } from "../../middlewares";

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createSequence);
router.get("/my", verifyToken, checkUserExisting, getUserSequences);
router.get("/:id", verifyToken, checkUserExisting, getSequence);
router.put("/:id", verifyToken, checkUserExisting, updateSequence);
router.delete("/:id", verifyToken, checkUserExisting, deleteSequence);

export = router;
