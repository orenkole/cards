import Button from "../classes/Button.js";

export const signUpBtn = new Button({
	classes: ["btn", "btn-primary"],
	text: "Логин",
	attributes: [
		{"data-bs-toggle": "modal"},
		{"data-bs-target": "#login-modal"}
	]
})
