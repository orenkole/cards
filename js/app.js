import HtmlElement from "./classes/HtmlElement.js";
import { signUpBtn } from "./components/signUpBtn.js";
import { createVisitBtn } from "./components/createVisitBtn.js";
import { createFormModal } from "./components/createFormModal.js";
import { visitsPalette } from "./components/visitsPalette.js";
import { loginModal } from "./components/loginForm.js";

const root = document.querySelector("#root");
root.style =
  "background-image: url(../img/header_bg.jpg); background-attachment: fixed; background-size: cover; height: 100vh; ";

export const headerContainer = new HtmlElement({
  tagName: "div",
  classes: [
    "d-flex",
    "justify-content-between",
    "container",
    "pt-4",
    "pb-4",
    "mb-5",
    "rounded-bottom",
    "align-items-center",
    "bg-dark",
    "bg-gradient",
  ],
  // attributes: [
  //   {
  //     style: "background-color :black; ",
  //   },
  // ],
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
  createFormModal.render(root, "beforeend");
} else {
  signUpBtn.render(headerContainer.element, "beforeend");
  loginModal.render(root, "beforeend");
}

visitsPalette.render(root, "beforeend");
visitsPalette.dragFunction();

// console.log(document.getElementsByClassName("position-absolute"));

// console.log(document.getElementsByClassName("position-absolute")[0]);
// console.log(visitsPalette.render());
// dragElement(document.getElementById("mydiv"));
// dragElement(document.getElementById("mydiv"));
// console.log(root);
// function dragElement(elmnt) {
//   var pos1 = 0,
//     pos2 = 0,
//     pos3 = 0,
//     pos4 = 0;
//   // if (document.getElementById(elmnt.id + "header")) {
//   //   // if present, the header is where you move the DIV from:
//   //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   // } else {
//   //   // otherwise, move the DIV from anywhere inside the DIV:
//   elmnt.onmousedown = dragMouseDown;
//   // }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = elmnt.offsetTop - pos2 + "px";
//     elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
// console.log("sdsd");
