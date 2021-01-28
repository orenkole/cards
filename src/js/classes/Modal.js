import HtmlElement from "./HtmlElement.js";

export default class Modal extends HtmlElement {
  constructor({tagName = "div",
    classes = [],
    attributes = [],
    text = ""
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    });
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.element.classList.remove("inactive")
    this.element.classList.add("active");
  }
  closeModal() {
    this.element.classList.remove("active");
    this.element.classList.add("inactive");
  }
}
