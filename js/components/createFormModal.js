import { Modal } from "../classes/Modal.js";
import { VisitForm } from "../classes/VisitForm.js";
import { visitsPalette } from "./visitsPalette.js";

export const createFormModal = new Modal({
  classes: ["modal", "fade"],
  id: "create-visit-modal",
  attributes: [{tabindex: "-1"}],
});

const createVisitForm = new VisitForm();
createVisitForm.render(createFormModal.modalBody.element, "beforeend");

createVisitForm.element.addEventListener("submit", (e) => {
	addVisitToPalette(e);
});
async function addVisitToPalette(e) {
	e.preventDefault();
	const visitObj = {};
	const formData = new FormData(e.target);
	formData.forEach((value, key) => {visitObj[key] = value});
	visitsPalette.addVisit(visitObj);
	// hide form
	createVisitForm.element.reset();
	createVisitForm.cancelBtn.element.click();
}
