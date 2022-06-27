const Workout = require("../models/workoutModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.verifyDate = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find();
  // const dates = [...workouts].map((e) => e.date);
  // console.log(workouts);
  const workout = [...workouts].find((e) => {
    return e.date.toISOString().slice(0, 10) === req.body.date.slice(0, 10);
  });
  console.log(workout);
  console.log(req.body);
  if (workout) {
    // await Workout.findByIdAndUpdate(workout._id, {
    //   exercises: req.bodyexercises,
    //   bodyWeight: req.body.bodyWeight,
    //   calories: req.body.calories,
    // });
    workout.bodyWeight = req.body.bodyWeight;
    workout.calories = req.body.calories;
    workout.exercises = req.body.exercises;
    await workout.save();

    console.log(date);
  }
  if (!workout) {
    next();
  }
  console.log(req.body.date);
  console.log(date);

  next();
});


exports.getAllWorkouts = catchAsync(async (req, res, next) => {
  const workouts = await Workout.find();
  res.status(200).json({
    status: "success",
    results: workouts.length,
    data: {
      workouts,
    },
  });
});

exports.getWorkout = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);

  if (!id) {
    return next(new AppError("No workout found with this id.", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      workout,
    },
  });
});

exports.createWorkout = catchAsync(async (req, res, next) => {
  let date = new Date(req.body.date).getTime()
  console.log(date)
  date = +date + 4*1000*60*60
  date = new Date(date)
  console.log(date)
  const workouts = await Workout.find();

  const workout = [...workouts].find((e) => {
    console.log(e.date.toISOString())
    return e.date.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
  });
  console.log(workout);
  console.log(req.body);
  if (workout) {
    const updateWorkout = await Workout.findById(workout._id);
    updateWorkout.bodyWeight = req.body.bodyWeight;
    updateWorkout.calories = req.body.calories;
    updateWorkout.exercises = req.body.exercises;
    await updateWorkout.save();
    res.json({
      status: "success",
      data: {
        workout: newWorkout,
      },
    });
  }

  const newWorkout = await Workout.create({
    author: req.body.author,
    date,
    bodyWeight: req.body.bodyWeight,
    calories: req.body.calories,
    exercises: req.body.exercises,
  });

  res.json({
    status: "success",
    data: {
      workout: newWorkout,
    },
  });
});
exports.updateWorkout = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const workout = await Workout.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!workout) {
    return next(new AppError("No workout found with this id.", 401));
  }

  res.json({
    status: "success",
    data: {
      workout,
    },
  });
});
exports.deleteWorkout = catchAsync(async (req, res, next) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) {
    return next(new AppError("No workout found with this id.", 401));
  }
  res.json({
    status: "success",
    data: null,
  });
});
