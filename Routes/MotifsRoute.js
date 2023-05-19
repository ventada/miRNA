const { getBaseScore, submitScore } = require("../controllers/MotifController");

const router = require("express").Router();

router.post("/basescore", getBaseScore);
router.post("/submitscore", submitScore);

module.exports = router;
