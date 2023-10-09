const { Router } = require("express");

const {
  createAsanasGroup,
  deleteAsanasGroup,
  getAllAsanasGroups,
  getAsanasGroup,
  updateAsanasGroup,
} = require("../controllers/asanas-group-controller");

const router = Router();

router.post("/create", createAsanasGroup);
router.get("/getAll", getAllAsanasGroups);
router.delete("/:id", deleteAsanasGroup);
router.get("/:id", getAsanasGroup);
router.put("/:id", updateAsanasGroup);

module.exports = router;
