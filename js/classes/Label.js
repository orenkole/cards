import HtmlElement from "./HtmlElement.js ";

export default class Label extends HtmlElement {
  constructor({tagName = "label",
    classes = [],
    attributes = [],
    text = "",
    forAttr = "",
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    });
    this.element.for = forAttr;
  }
}