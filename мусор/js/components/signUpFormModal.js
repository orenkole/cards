import Modal from "../classes/Modal.js";
import {signUpFormObj} from "./signUpFormObj.js";

// render sign up form modal
export const signUpFormModalObj = new Modal({
  tagName: "div",
  classes: ["inactive"]
})
export const signUpFormModalElement = signUpFormModalObj.element;

signUpFormObj.render(signUpFormModalElement, "beforeend");

