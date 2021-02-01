import HtmlElement from "./HtmlElement.js";

export default class Button extends HtmlElement {
  constructor({tagName = "button",
    classes = [],
    attributes = [],
    text = "",
    type = ""
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    })
    this.element.type = type;
  }
}
