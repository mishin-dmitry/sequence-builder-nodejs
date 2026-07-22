import { Router } from "express";
import {
  createPranayamaSequence,
  getPranayamaSequence,
  updatePranayamaSequence,
  deletePranayamaSequence,
  getUserPranayamaSequences,
} from "../../controllers/pranayamas-sequence-builder/pranayama-sequence.controller";
import { verifyToken, checkUserExisting } from "../../middlewares";

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createPranayamaSequence);
router.get("/my", verifyToken, checkUserExisting, getUserPranayamaSequences);
router.get("/:id", verifyToken, checkUserExisting, getPranayamaSequence);
router.put("/:id", verifyToken, checkUserExisting, updatePranayamaSequence);
router.delete("/:id", verifyToken, checkUserExisting, deletePranayamaSequence);

export = router;
