export default (msg) => {
  document
    .querySelector("body")
    .insertAdjacentHTML(
      "beforeend",
      `<div class="message-box msg-error">${msg}</div>`
    );
  setTimeout(() => {
    document.querySelector(".message-box").remove();
  }, 1500);
};
