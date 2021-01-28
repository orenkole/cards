import HtmlElement from "./HtmlElement.js";

export default class Modal extends HtmlElement {
  constructor({
    tagName = "div",
    classes = [],
    // attributes = [],
    attributes = {},
    text = "",
  } = {}) {
    super({ tagName, classes, attributes, text });
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.element.classList.remove("inactive");
    this.element.classList.add("active");
  }
  closeModal() {
    this.element.classList.remove("active");
    this.element.classList.add("inactive");
  }

  // под вопросом (говнокод, не придумал как сделать):
  renderBootstrapModal() {
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
      classes: "modal-title",
      id: "exampleModalLabel",
      text: "Modal title",
    });

    const buttonCross = new HtmlElement({
      tagName: "button",
      type: "button",
      class: "btn-close",
      attributes: {
        "data-bs-dismiss": "modal",
        "aria-label": "Close",
      },
    });

    const modalBody = new HtmlElement({
      tagName: "div",
      classes: ["modal-body"],
      text: "HERE IS TEXT",
    });

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
      text: "Save changes",
    });

    modalFooter.element.append(closeBtn.element, saveBtn.element);
    modalHeader.element.append(modalTitle.element, buttonCross.element);
    modalContent.element.append(
      modalHeader.element,
      modalBody.element,
      modalFooter.element
    );
    modalMain.element.append(modalContent.element);

    modalMain.render(document.body, "afterbegin");
  }
}
