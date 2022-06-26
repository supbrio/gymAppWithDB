const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  author: { type: String, required: [true, "User must be defined"] },
  date: {
    type: Date,
    required: [true, "Post a valid date"],
  },
  bodyWeight: { type: Number, default: null },
  calories: { type: Number, default: null },
  exercises: [
    {
      exercise: {
        type: String,
        enum: ["Squat", "Deadlift", "Benchpress", "Overheadpress", "Legpress"],
      },
      weight: { type: Number, require: [true, "Exercise is needed"] },
      sets: [Number],
    },
  ],
});

workoutSchema.index({ date: 1, author: 1 }, { unique: true });

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
