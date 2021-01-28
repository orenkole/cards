import {signUpBtnObj, signUpBtnElement} from "./components/signUpBtnObj.js";
import {signUpFormModalObj} from "./components/signUpFormModal.js";
import {createBtnElement, createBtnObj} from "./components/createBtnObj.js";
import { publish, state } from "./state/state.js";
import { createVisitModalObj } from "./components/createVisitModal.js";

const root = document.querySelector("#root");

if(state.token) {
  publish({event: "loggedIn"})
}

signUpBtnObj.render(root, "afterbegin");
signUpBtnElement.addEventListener("click", signUpFormModalObj.openModal);

createBtnObj.render(root, "afterbegin");
createBtnElement.addEventListener("click", createVisitModalObj.openModal);

signUpFormModalObj.render(root, "beforeend");
createVisitModalObj.render(root, "beforeend");
