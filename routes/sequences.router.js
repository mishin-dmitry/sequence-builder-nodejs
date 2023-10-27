const { Router } = require("express");

const {
  createSequence,
  getSequence,
  deleteSequence,
  updateSequence,
  getUserSequences,
  getPublicSequences,
} = require("../controllers/sequence.controller");

const { verifyToken, checkUserExisting } = require("../middlewares");

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createSequence);
router.get("/get", verifyToken, checkUserExisting, getSequence);
router.delete("/delete", verifyToken, checkUserExisting, deleteSequence);

router.get(
  "/getUserSequences",
  verifyToken,
  checkUserExisting,
  getUserSequences
);

router.get(
  "/getGlobalSequences",
  verifyToken,
  checkUserExisting,
  getPublicSequences
);

module.exports = router;
