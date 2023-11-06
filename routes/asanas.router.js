const { Router } = require("express");

const {
  createAsana,
  deleteAsana,
  getAllAsanas,
  getAsana,
  updateAsana,
} = require("../controllers/asana.controller");

const router = Router();

router.post("/create", createAsana);
router.get("/getAll", getAllAsanas);
router.delete("/:id", deleteAsana);
router.get("/:id", getAsana);
router.put("/:id", updateAsana);

module.exports = router;
