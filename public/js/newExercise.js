export default (data) => {
  const exercisesContainer = document.querySelector(".whole-workout");
  console.log("jee");
  const markup = `<p class="exercise-text">
  <span class="exercise"> ${data.exercise}</span> 
  <span class="weight"> ${data.exerciseWeight}kg </span>
  <span class="sets"> (${data.sets}) </span>
  </p>`;
  exercisesContainer.insertAdjacentHTML("beforeend", markup);
};
