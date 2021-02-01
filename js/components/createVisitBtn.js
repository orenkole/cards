import Button from "../classes/Button.js";

export const createVisitBtn = new Button({
	classes: ["btn", "btn-primary"],
	text: "Create visit",
	attributes: [
		{"data-bs-toggle": "modal"},
		{"data-bs-target": "#create-visit-modal"}
	]
})
