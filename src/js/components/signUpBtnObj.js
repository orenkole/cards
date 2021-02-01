import { state, subscribe } from "../state/state.js";
import Button from "../classes/Button.js";

export const signUpBtnObj = new Button({
  text: "Вход",
  attributes: {
    id: "login",

    type: "button",
    classes: ["btn", "btn-primary"],
    "data-bs-toggle": "modal",
    "data-bs-target": "#exampleModal",
  },
});

export const signUpBtnElement = signUpBtnObj.element;

if (state.token) {
  signUpBtnElement.classList.add("inactive");
  signUpBtnElement.classList.remove("active");
} else {
  signUpBtnElement.classList.add("active");
  signUpBtnElement.classList.remove("inactive");
}

subscribe({
  event: "loggedIn",
  callback: () => {
    signUpBtnElement.style.display = "none";
  },
});
