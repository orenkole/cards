import HtmlElement from "./classes/HtmlElement.js";
import { signUpBtn } from "./components/signUpBtn.js";
import { createVisitBtn } from "./components/createVisitBtn.js";
import { createFormModal } from "./components/createFormModal.js";
import { visitsPalette } from "./components/visitsPalette.js";
import { loginModal } from "./components/loginForm.js";
import { SearchContainer } from "./components/createFilterForm.js";

const root = document.querySelector("#root");
root.style =
  "background-image: url(../img/header_bg.jpg); background-attachment: fixed; background-size: cover;  padding-bottom: 320px; min-height: 100vh; height: 100% ";

export const headerContainer = new HtmlElement({
  tagName: "div",
  classes: [
    "d-flex",
    "justify-content-between",
    "container",
    "pt-3",
    "pb-3",
    "mb-3",
    "rounded-bottom",
    "align-items-center",
    "bg-dark",
    "bg-gradient",
  ],
});
headerContainer.render(root, "beforeend");
const logoElement = new HtmlElement({
  tagName: "span",
  text: "NashaClinica",
  classes: ["text-light", "text-uppercase", "font-weight-bold", "h3"],
});

logoElement.render(headerContainer.element, "beforeend");

const token = localStorage.getItem("token");

if (token) {
  createVisitBtn.render(headerContainer.element, "beforeend");
  // here adding filter
  SearchContainer.render(root, "beforeend");
  createFormModal.render(root, "beforeend");
} else {
  signUpBtn.render(headerContainer.element, "beforeend");
  loginModal.render(root, "beforeend");
}

visitsPalette.render(root, "beforeend");
visitsPalette.dragFunction();
