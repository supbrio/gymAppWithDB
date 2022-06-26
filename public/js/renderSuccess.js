export default (msg) => {
  console.log("lol");
  document
    .querySelector("body")
    .insertAdjacentHTML(
      "beforeend",
      `<div class="message-box msg-success">${msg}</div>`
    );
  setTimeout(() => {
    document.querySelector(".message-box").remove();
  }, 1500);
};
