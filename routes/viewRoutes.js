const express = require("express");
const {
  getLogin,
  getDiary,
  getWorkouts,
  renderCharts,
} = require("../controllers/viewController");

const router = express.Router();

router.get("/", getDiary);
router.get("/login", getLogin);
router.get("/diary/:date", getDiary);
router.get("/charts", renderCharts);

router.get("/user", (req, res, next) => {
  res.render("user");
});

router.get("/workouts", getWorkouts);

module.exports = router;
