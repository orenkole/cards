import HtmlElement from "./classes/HtmlElement.js";
import { signUpBtn } from "./components/signUpBtn.js";
import { createVisitBtn } from "./components/createVisitBtn.js";
import { createFormModal } from "./components/createFormModal.js";
import { visitsPalette } from "./components/visitsPalette.js";
import { loginModal } from "./components/loginForm.js";
import { SearchContainer } from "./components/createFilterForm.js";

const root = document.querySelector("#root");

export const headerContainer = new HtmlElement({
  tagName: "div",
  classes: ["d-flex", "justify-content-between", "container", "pt-4", "mb-5"],
});
headerContainer.render(root, "beforeend");
const logoElement = new HtmlElement({
  tagName: "span",
  text: "Logotype",
});

logoElement.render(headerContainer.element, "beforeend");

const token = localStorage.getItem("token");

if (token) {
  createVisitBtn.render(headerContainer.element, "beforeend");
  // тут я врезаюсь фильтром
  SearchContainer.render(root, "beforeend");
  createFormModal.render(root, "beforeend");
} else {
  signUpBtn.render(headerContainer.element, "beforeend");
  loginModal.render(root, "beforeend");
}

visitsPalette.render(root, "beforeend");
