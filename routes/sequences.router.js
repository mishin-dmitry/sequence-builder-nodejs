const { Router } = require("express");

const { createSequence } = require("../controllers/sequence.controller");
const { verifyToken, checkUserExisting } = require("../middlewares");

const router = Router();

// TODO
router.post("/create", verifyToken, checkUserExisting, createSequence);

module.exports = router;
