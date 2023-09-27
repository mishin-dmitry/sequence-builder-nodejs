const { Router } = require("express");

const {
  createAsana,
  deleteAsana,
  getAllAsanas,
  getAsana,
  updateAsana,
} = require("../controllers/asana-controller");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/create", upload.single("image"), createAsana);
router.get("/getAll", getAllAsanas);
router.delete("/:id", deleteAsana);
router.get("/:id", getAsana);
router.put("/:id", upload.single("image"), updateAsana);

module.exports = router;
