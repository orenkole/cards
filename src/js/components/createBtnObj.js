import { state, subscribe } from "../state/state.js";
import Button from "../classes/Button.js";

export const createBtnObj = new Button({
  text: "Создать",
  attributes: {
    id: "create",
  },
});
export const createBtnElement = createBtnObj.element;

if (state.token) {
  createBtnElement.classList.add("active");
  createBtnElement.classList.remove("inactive");
} else {
  createBtnElement.classList.add("inactive");
  createBtnElement.classList.remove("active");
}

subscribe({
  event: "loggedIn",
  callback: () => {
    console.log("LOG");
    createBtnElement.style.display = "flex";
  },
});
