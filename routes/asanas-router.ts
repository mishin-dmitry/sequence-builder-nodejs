import { Router } from "express";

import {
  createAsana,
  deleteAsana,
  getAllAsanas,
  getAsana,
  updateAsana,
} from "../controllers/asana-controller";

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/create", upload.single("image"), createAsana);
router.get("/getAll", getAllAsanas);
router.delete("/:id", deleteAsana);
router.get("/:id", getAsana);
router.put("/:id", upload.single("image"), updateAsana);

export default router;
