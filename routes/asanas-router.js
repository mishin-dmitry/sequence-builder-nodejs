const { Router } = require("express");

const {
  createAsana,
  deleteAsana,
  getAllAsanas,
  getAsana,
  // updateAsana,
} = require("../controllers/asana-controller");

const s3 = require("../config/s3-client");

const multerS3 = require("multer-s3");
const multer = require("multer");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sequoia-cdn",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, `asanas/pictograms/${file.originalname}`);
    },
  }),
});

const router = Router();

router.post("/create", upload.single("image"), createAsana);
router.get("/getAll", getAllAsanas);
router.delete("/:id", deleteAsana);
router.get("/:id", getAsana);
// router.put("/:id", upload.single("image"), updateAsana);

module.exports = router;
