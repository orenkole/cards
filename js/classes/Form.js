import HtmlElement from "./HtmlElement.js";

export default class Form extends HtmlElement {
  constructor({tagName = "form",
    classes = [],
    attributes = [],
  } = {}) {
    super({tagName,
      classes,
      attributes,
    })
  }
}
