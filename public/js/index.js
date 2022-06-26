// import Chart from 'highcharts/es-modules/Core/Chart/c'
import { createChart } from "./charts.js";
import newExercise from "./newExercise.js";
import postWorkout from "./postWorkout.js";
import { postLogin, forgotPassword, signUp } from "./loginFuncs.js";
console.log("jee");

const chart = document.querySelector("#chart");
const exerciseForm = document.querySelector(".input-exercise");
const postWorkoutButton = document.querySelector(".btn-post-workout");
const loginForm = document.querySelector(".login");

if (chart) {
  document.addEventListener("DOMContentLoaded", createChart);
}

if (exerciseForm) {
  const exercise = exerciseForm.querySelector(".input-exercise");
  const exerciseWeight = exerciseForm.querySelector(".input-exercise-weight");
  const sets = exerciseForm.querySelector(".input-sets");
  exerciseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    newExercise({
      exercise: exercise.value,
      exerciseWeight: exerciseWeight.value,
      sets: sets.value.split(","),
    });
    exercise.value = exerciseWeight.value = sets.value = "";
  });
}

if (postWorkoutButton) {
  postWorkoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    let date = new Date(document.querySelector(".input-date").value);
    // date = +date.getTime();
    // date = new Date(date);
    console.log(date);
    const bodyWeight = document.querySelector(".input-body-weight").value;
    const calories = document.querySelector(".input-calories").value;
    const exercises = Array.from(document.querySelectorAll(".exercise-text"))
      .map((e) => e.innerText)
      .map((e) => e.split("\n"));
    postWorkout({ date, bodyWeight, calories, exercises });
    // const [exercise, exerciseWeight, sets] = Array.from(
    //   document.querySelectorAll(".exercise-text")
    // )
    //   .map((e) => e.innerText)
    //   .join("")
    //   .split("\n");
    // postWorkout({ exercise, exerciseWeight, sets });
  });
}
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = loginForm.querySelector(".login-email").value;
    const password = loginForm.querySelector(".login-password").value;
    postLogin({ email, password });
  });
  loginForm.querySelector(".sign-up").addEventListener("click", signUp);
  loginForm
    .querySelector(".password-reset")
    .addEventListener("click", forgotPassword);
}
