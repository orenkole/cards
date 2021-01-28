import HtmlElement from "./HtmlElement.js ";

export default class Select extends HtmlElement {
  constructor({tagName = "select",
    classes = [],
    attributes = [],
    text = "",
    // placeholder = "",
    // name = "",
    values = []
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    });
    // this.element.placeholder = placeholder;
    // this.element.name = name;
    this.values = values;
    this.createOptions();
  }
  createOptions() {
    this.values.forEach(value => {
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.text = value;
      this.element.append(optionElement);
    })
  }
}
