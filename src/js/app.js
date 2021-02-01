import { signUpBtnObj, signUpBtnElement } from "./components/signUpBtnObj.js";
import { signUpFormModalObj } from "./components/signUpFormModal.js";

import { signUpModalWindow } from "./components/signUpFormModal.js";

import { createBtnElement, createBtnObj } from "./components/createBtnObj.js";
import { publish, state } from "./state/state.js";
import { createVisitModalObj } from "./components/createVisitModal.js";

const buttonsHeaderPlacement = document.getElementById("buttons");

if (state.token) {
  publish({ event: "loggedIn" });
}

signUpBtnObj.render(buttonsHeaderPlacement, "afterbegin");

signUpBtnElement.addEventListener("click", signUpFormModalObj.openModal);

// not working
signUpModalWindow.render(signUpBtnObj, "afterbegin");

createBtnObj.render(buttonsHeaderPlacement, "afterbegin");
createBtnElement.addEventListener("click", createVisitModalObj.openModal);

signUpFormModalObj.render(buttonsHeaderPlacement, "beforeend");
createVisitModalObj.render(buttonsHeaderPlacement, "beforeend");
