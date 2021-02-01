import HtmlElement from "./HtmlElement.js";

export default class Div extends HtmlElement {
  constructor({tagName = "div",
    classes = [],
    attributes = [],
    text = "",
    id = "",
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text,
      id
    })
  }
}