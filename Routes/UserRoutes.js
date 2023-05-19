const {
  submitActions,
  getUserRank,
  saveUserProgress,
  restoreUserProgress,
} = require("../controllers/UserController");
const router = require("express").Router();

router.post("/submitaction", submitActions);
router.get("/userrank", getUserRank);
router.post("/saveuserprgress", saveUserProgress);
router.get("/restoreuserprgress", restoreUserProgress);

module.exports = router;
