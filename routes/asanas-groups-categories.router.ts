import { Router } from "express";
import {
  createAsanasGroupsCategory,
  deleteAsanasGroupsCategory,
  getAllAsanasGroupsCategories,
  getAsanasGroupsCategory,
  updateAsanasGroupsCategory,
} from "../controllers/asana-group-category.controller";
import { verifyToken, checkUserExisting } from "../middlewares";

const router = Router();

router.post(
  "/create",
  verifyToken,
  checkUserExisting,
  createAsanasGroupsCategory
);
router.get("/getAll", getAllAsanasGroupsCategories);
router.delete(
  "/:id",
  verifyToken,
  checkUserExisting,
  deleteAsanasGroupsCategory
);
router.get("/:id", getAsanasGroupsCategory);
router.put(
  "/:id",
  verifyToken,
  checkUserExisting,
  updateAsanasGroupsCategory
);

export = router;
