import { Router } from "express";
import {
  createAsanasGroup,
  deleteAsanasGroup,
  getAllAsanasGroups,
  getAsanasGroup,
  updateAsanasGroup,
} from "../../controllers/asanas-sequence-builder/asanas-group.controller";
import { verifyToken, checkUserExisting } from "../../middlewares";

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createAsanasGroup);
router.get("/getAll", getAllAsanasGroups);
router.delete("/:id", verifyToken, checkUserExisting, deleteAsanasGroup);
router.get("/:id", getAsanasGroup);
router.put("/:id", verifyToken, checkUserExisting, updateAsanasGroup);

export = router;
