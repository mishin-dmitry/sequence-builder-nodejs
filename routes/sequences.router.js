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
router.get("/:id", verifyToken, checkUserExisting, getSequence);
router.delete("/:id", verifyToken, checkUserExisting, deleteSequence);
router.put("/:id", verifyToken, checkUserExisting, updateSequence);

module.exports = router;
