import Modal from "../classes/Modal.js";
import HtmlElement from "../classes/HtmlElement.js";

import { signUpFormObj } from "./signUpFormObj.js";

// render sign up form modal
// export const signUpFormModalObj = new Modal({
//   tagName: "div",
//   // classes: ["inactive"],
// });
// export const signUpFormModalElement = signUpFormModalObj.element;

// signUpFormObj.render(signUpFormModalElement, "beforeend");

//
//
//
//
//

// Под вопросом:

export const signUpModalWindow = new Modal({
  tagName: "div",
  classes: ["modal", "fade"],
  attributes: {
    id: "exampleModal",
    tabindex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true",
  },
});

export const signUpFormModalElement = signUpModalWindow.element;

export function createModal() {
  const modalMain = new HtmlElement({
    tagName: "div",
    classes: ["modal-dialog"],
  });
  const modalContent = new HtmlElement({
    tagName: "div",
    classes: ["modal-content"],
  });

  const modalHeader = new HtmlElement({
    tagName: "div",
    classes: ["modal-header"],
  });

  const modalTitle = new HtmlElement({
    tagName: "h5",
    classes: ["modal-title"],
    attributes: {
      id: "exampleModalLabel",
    },
    text: "Modal title",
  });

  const buttonCross = new HtmlElement({
    tagName: "button",
    type: "button",
    classes: ["btn-close"],
    attributes: {
      "data-bs-dismiss": "modal",
      "aria-label": "Close",
    },
  });

  const modalBody = new HtmlElement({
    tagName: "div",
    classes: ["modal-body"],
    text: "Please Login:",
  });

  // signUpFormModalObj.render(modalBody, "beforeend");

  const signUpFormModalObj = new Modal({
    tagName: "div",
    // classes: ["inactive"],
  });
  const signUpFormModalElement = signUpFormModalObj.element;

  const modalFooter = new HtmlElement({
    tagName: "div",
    classes: ["modal-footer"],
  });

  const closeBtn = new HtmlElement({
    tagName: "button",
    classes: ["btn", "btn-secondary"],
    attributes: {
      "data-bs-dismiss": "modal",
    },
    text: "Close",
  });

  const saveBtn = new HtmlElement({
    tagName: "button",
    attributes: {
      type: "button",
    },
    classes: ["btn", "btn-primary"],
    text: "Login",
  });

  modalFooter.element.append(closeBtn.element, saveBtn.element);
  modalHeader.element.append(modalTitle.element, buttonCross.element);
  modalContent.element.append(
    modalHeader.element,
    modalBody.element,
    modalFooter.element
  );
  modalMain.element.append(modalContent.element);

  signUpFormModalObj.render(modalBody.element, "beforeend");
  signUpFormObj.render(signUpFormModalElement, "beforeend");

  modalMain.render(signUpModalWindow.element, "afterbegin");
}
