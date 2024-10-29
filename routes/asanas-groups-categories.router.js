const { Router } = require("express");

const {
  createAsanasGroupsCategory,
  deleteAsanasGroupsCategory,
  getAllAsanasGroupsCategories,
  getAsanasGroupsCategory,
  updateAsanasGroupsCategory,
} = require("../controllers/asana-group-category.controller");

const router = Router();

router.post("/create", createAsanasGroupsCategory);
router.get("/getAll", getAllAsanasGroupsCategories);
router.delete("/:id", deleteAsanasGroupsCategory);
router.get("/:id", getAsanasGroupsCategory);
router.put("/:id", updateAsanasGroupsCategory);

module.exports = router;
