import { signUpBtnObj, signUpBtnElement } from "./components/signUpBtnObj.js";
// import { signUpFormModalObj } from "./components/signUpFormModal.js";

import {
  signUpModalWindow,
  createModal,
} from "./components/signUpFormModal.js";

import { createBtnElement, createBtnObj } from "./components/createBtnObj.js";
import { publish, state } from "./state/state.js";
import { createVisitModalObj } from "./components/createVisitModal.js";

const buttonsHeaderPlacement = document.getElementById("buttons");

if (state.token) {
  publish({ event: "loggedIn" });
}

signUpBtnObj.render(buttonsHeaderPlacement, "afterbegin");
signUpModalWindow.render(buttonsHeaderPlacement, "afterbegin");
createModal();

// signUpBtnElement.addEventListener("click", signUpFormModalObj.openModal);

createBtnObj.render(buttonsHeaderPlacement, "afterbegin");
createBtnElement.addEventListener("click", createVisitModalObj.openModal);

// signUpFormModalObj.render(buttonsHeaderPlacement, "beforeend");
createVisitModalObj.render(buttonsHeaderPlacement, "beforeend");
