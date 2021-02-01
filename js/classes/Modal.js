import Div from "./Div.js";

export class Modal extends Div {
	constructor({
		classes= ["modal", "fade"],
		id = "create-visit-modal",
		attributes= [{tabindex: "-1"}],
	}) {
		super({
			classes,
			id,
			attributes,
		});
		this.renderModalWrapper();
	}

	renderModalWrapper() {
		this.modalDialog = new Div({
			classes: ["modal-dialog", "modal-dialog-centered"],
		})
		this.modalDialog.render(this.element, "beforeend");

		this.modalContent = new Div({
			classes: ["modal-content"],
		})
		this.modalContent.render(this.modalDialog.element, "beforeend");

		this.modalBody = new Div({
			classes: ["modal-body"],
		})
		this.modalBody.render(this.modalContent.element, "beforeend");
  }
}
