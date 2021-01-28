import HtmlElement from "./HtmlElement.js ";

export default class Input extends HtmlElement {
  constructor({tagName = "input",
    classes = [],
    attributes = [],
    text = "",
    placeholder = "",
    name = "",
    type = "",
    value = ""
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    });
    this.element.placeholder = placeholder;
    this.element.name = name;
    this.element.type = type;
    this.element.value = value;
  }
}
