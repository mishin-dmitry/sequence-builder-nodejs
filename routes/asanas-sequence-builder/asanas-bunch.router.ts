import { Router } from "express";
import {
  createBunch,
  deleteBunch,
  getBunch,
  updateBunch,
  getUserAsanaBunches,
} from "../../controllers/asanas-sequence-builder/bunch.controller";
import { verifyToken, checkUserExisting } from "../../middlewares";

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createBunch);
router.get("/my", verifyToken, checkUserExisting, getUserAsanaBunches);
router.delete("/:id", verifyToken, checkUserExisting, deleteBunch);
router.get("/:id", verifyToken, checkUserExisting, getBunch);
router.put("/:id", verifyToken, checkUserExisting, updateBunch);

export = router;
