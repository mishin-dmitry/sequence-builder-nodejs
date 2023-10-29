const { Router } = require("express");

const {
  getUserSequences,
  getPublicSequences,
} = require("../controllers/sequence.controller");

const { verifyToken, checkUserExisting } = require("../middlewares");

const router = Router();

router.get("/my", verifyToken, checkUserExisting, getUserSequences);
router.get("/public", verifyToken, checkUserExisting, getPublicSequences);

module.exports = router;
