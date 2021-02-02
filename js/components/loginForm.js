import Form from "../classes/Form.js";
import Div from "../classes/Div.js";
import Label from "../classes/Label.js";
import Input from "../classes/Input.js";
import Button from "../classes/Button.js";
import Request from "../queries/Request.js";
import { signUpBtn } from "./signUpBtn.js";
import { createVisitBtn } from "./createVisitBtn.js";
import { createFormModal } from "./createFormModal.js";
import { visitsPalette } from "./visitsPalette.js";
import { SearchContainer } from "./createFilterForm.js";

import { headerContainer } from "../app.js";

// create modal
export const loginModal = new Div({
  classes: ["modal", "fade"],
  id: "login-modal",
  attributes: [{ tabindex: "-1" }],
});

const modalDialog = new Div({
  classes: ["modal-dialog", "modal-dialog-centered"],
});
modalDialog.render(loginModal.element, "beforeend");

const modalContent = new Div({
  classes: ["modal-content"],
});
modalContent.render(modalDialog.element, "beforeend");

const modalBody = new Div({
  classes: ["modal-body"],
});
modalBody.render(modalContent.element, "beforeend");

// create login form
export const loginForm = new Form();

const mb3Email = new Div({ classes: ["mb-3"] });
mb3Email.render(loginForm.element, "beforeend");

const emailLabel = new Label({
  for: "email",
  classes: ["form-label"],
  text: "Email address",
});
emailLabel.render(mb3Email.element, "beforeend");

const emailInput = new Input({
  id: "email",
  classes: ["form-control"],
  type: "email",
});
emailInput.render(mb3Email.element, "beforeend");

const mb3Password = new Div({ classes: ["mb-3"] });
mb3Password.render(loginForm.element, "beforeend");

const passwordLabel = new Label({
  for: "password",
  classes: ["form-label"],
  text: "Password",
});
passwordLabel.render(mb3Password.element, "beforeend");

const passwordInput = new Input({
  id: "password",
  classes: ["form-control"],
  type: "password",
});
passwordInput.render(mb3Password.element, "beforeend");

const submitBtn = new Button({
  type: "submit",
  text: "Submit",
  classes: ["btn", "btn-primary"],
});
submitBtn.render(loginForm.element, "beforeend");

loginForm.render(modalBody.element, "beforeend");

loginForm.element.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginRequest = new Request();
  const body = {
    email: emailInput.element.value,
    password: passwordInput.element.value,
  };
  const tokenPromise = loginRequest.sendRequest({
    body: body,
    path: "login",
    method: "POST",
  });
  tokenPromise.then(onLoginSuccess).catch((err) => {
    console.log(`Error: ${err}`);
  });
});

const onLoginSuccess = (token) => {
  if (token === "Incorrect username or password") {
    alert("sign up failure");
  } else {
    console.log(token);
    emailInput.element.value = "";
    passwordInput.element.value = "";
    signUpBtn.element.remove();
    // // тут я врезаюсь фильтром. Врезаюсь перед visitsPalette - потому что оно где-то рендерится до этого
    SearchContainer.render(visitsPalette.element, "beforebegin");
    createVisitBtn.render(headerContainer.element, "beforeend");
    createFormModal.render(root, "beforeend");
    localStorage.setItem("token", token);
    visitsPalette.refreshContent();
    loginModal.element.remove();
    document.querySelector(".modal-backdrop").remove();
  }
};
