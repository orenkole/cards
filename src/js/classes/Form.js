import HtmlElement from "./HtmlElement.js";

export default class Form extends HtmlElement {
  constructor({
    tagName = "form",
    classes = [],
    // attributes = [],
    attributes = {},
    text = "",
  } = {}) {
    super({ tagName, classes, attributes, text });
  }
  sendData() {}
}
