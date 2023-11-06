const { Router } = require("express");

const { createFeedback } = require("../controllers/feedback.controller");

const router = Router();

router.post("/", createFeedback);

module.exports = router;
