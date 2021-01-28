import HtmlElement from "./HtmlElement.js";

export default class Button extends HtmlElement {
  constructor({tagName = "button",
    classes = [],
    attributes = [],
    text = ""
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    })
  }
  handlePress(handler) {
    this.element.addEventListener("click", handler)
  }
}
