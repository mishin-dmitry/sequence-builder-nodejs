const { Router } = require("express");

const {
  createBunch,
  deleteBunch,
  getBunch,
  updateBunch,
  getUserAsanaBunches,
} = require("../controllers/bunch.controller");

const { verifyToken, checkUserExisting } = require("../middlewares");

const router = Router();

router.post("/create", verifyToken, checkUserExisting, createBunch);
router.get("/my", verifyToken, checkUserExisting, getUserAsanaBunches);
router.delete("/:id", verifyToken, checkUserExisting, deleteBunch);
router.get("/:id", verifyToken, checkUserExisting, getBunch);
router.put("/:id", verifyToken, checkUserExisting, updateBunch);

module.exports = router;
