// import axios from "../../node_modules/axios/index";
import renderSuccess from "./renderSuccess.js";
import renderError from "./renderError.js";
export default async (data) => {
  try {
    const exercises = data.exercises.map((e) => {
      return {
        exercise: e[0],
        weight: +e[1].replace("kg", ""),
        sets: e[2]
          .replaceAll("(", "")
          .replaceAll(")", "")
          .split(",")
          .map((e) => +e),
      };
    });
    const payLoad = {
      author: "live_id09@hotmail.com",
      date: data.date,
      bodyWeight: data.bodyWeight,
      calories: data.calories,
      exercises,
    };
    const res = await axios.post(
      "http://127.0.0.1:3000/api/v1/workouts",
      payLoad
    );
    if (res.data.status === "success") {
      renderSuccess("Succesfully added a workout");
    }
  } catch (err) {
    renderError(err.msg);
  }
};
