import {state, subscribe} from "../state/state.js";
import Modal from "../classes/Modal.js";
import {createVisitFormObj} from "./createVisitFormObj.js";

// render sign up form modal
export const createVisitModalObj = new Modal({
  tagName: "div",
  classes: ["inactive"]
})
export const createVisitModalElement = createVisitModalObj.element;

createVisitFormObj.render(createVisitModalElement, "beforeend");

subscribe({
  event: "visitCreated",
  callback: () => {
  	console.log("LOG")
    createVisitModalElement.classList.add("inactive");
    createVisitModalElement.classList.remove("active");
  }
})
