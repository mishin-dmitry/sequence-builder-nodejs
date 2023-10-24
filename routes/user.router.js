const { Router } = require("express");

const { getUser } = require("../controllers/user.controller");
const { verifyToken, checkUserExisting } = require("../middlewares");

const router = Router();

router.get("/getUser", verifyToken, checkUserExisting, getUser);

module.exports = router;
