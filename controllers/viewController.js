const Workout = require("../models/workoutModel");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment-timezone");
const dateFinland = moment.tz(Date.now(), "Europe/Helsinki");

exports.getDiary = catchAsync(async (req, res, next) => {
  // let date = new Date(dateFinland.toLocaleString());
  let date = new Date(Date.now()).getTime();
  // console.log(date);
  date = new Date(date);
  // console.log(date);
  // date = date.toLocaleString("fi-FI");;
  // console.log(dateFinland);
  if (req.params.date) {
    let date = new Date(req.params.date).getTime();
    console.log(date);
    date = new Date(date);
    // console.log(date);
    // date = +date.getTime() + 1 * 1000 * 60 * 60 * 24;
    // date = new Date(date);
  }
  const workouts = await Workout.find();
  const workout = [...workouts].find((e) => {
    return (
      e.date.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
    );
  });

  if (workout) {
    res.render("diary", { title: "Diary", workout });
  }
  res.render("diary", { title: "Diary" });
});

exports.getWorkouts = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find();

  res.status(200).render("workouts", { title: "Workouts", workouts });
});

exports.renderCharts = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find();

  res.status(200).render("charts", { title: "Chart", workouts });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render("login", { title: "Login" });
});
