import { Router } from "express";
import { uploadFileToS3 } from "../controllers/s3.controller";
import {
  createAsana,
  deleteAsana,
  getAllAsanas,
  getAsana,
  updateAsana,
} from "../controllers/asana.controller";
import { verifyToken, checkUserExisting } from "../middlewares";

const router = Router();

router.post(
  "/create",
  verifyToken,
  checkUserExisting,
  uploadFileToS3.single("image"),
  createAsana
);
router.put(
  "/:id",
  verifyToken,
  checkUserExisting,
  uploadFileToS3.single("image"),
  updateAsana
);
router.get("/getAll", getAllAsanas);
router.delete("/:id", verifyToken, checkUserExisting, deleteAsana);
router.get("/:id", getAsana);

export = router;
