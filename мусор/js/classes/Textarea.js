import HtmlElement from "./HtmlElement.js ";

export default class Textarea extends HtmlElement {
  constructor({tagName = "textarea",
    classes = [],
    attributes = [],
    text = "",
    placeholder = "",
    name = "",
    rows,
    cols
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    });
    this.element.placeholder = placeholder;
    this.element.name = name;
    this.element.rows = rows;
    this.element.cols = cols;
  }
}
