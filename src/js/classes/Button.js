import HtmlElement from "./HtmlElement.js";

export default class Button extends HtmlElement {
  constructor({
    tagName = "button",
    classes = [],
    // attributes = [],
    attributes = {},
    id = "",
    text = "",
  } = {}) {
    super({ tagName, classes, attributes, text, id });
  }
  handlePress(handler) {
    this.element.addEventListener("click", handler);
  }
}
