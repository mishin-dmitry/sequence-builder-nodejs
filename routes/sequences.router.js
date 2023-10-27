const { Router } = require("express");

const {
  createSequence,
  getSequence,
  deleteSequence,
  updateSequence,
} = require("../controllers/sequence.controller");

const { verifyToken, checkUserExisting } = require("../middlewares");

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createSequence);
router.get("/get", verifyToken, checkUserExisting, getSequence);
router.delete("/delete", verifyToken, checkUserExisting, deleteSequence);
router.put("/update", verifyToken, checkUserExisting, updateSequence);

module.exports = router;
