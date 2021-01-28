export default class HtmlElement {
  constructor({tagName = "",
    classes = [],
    attributes = [],
    text = ""
  }) {
    this.tagName = tagName;
    this.classes = classes;
    this.attributes = attributes;
    this.text = text
    this.element;
    this.create();
  }
  create() {
    const element = document.createElement(this.tagName);
    element.classList.add(...this.classes);
    this.attributes.forEach(attribute => {
      let [[attributeName, attributeValue]] = Object.entries(attribute);
      element.setAttribute(attributeName, attributeValue);
    })
    element.textContent = this.text;
    this.element = element;
    return this.element;
  }
  render(parentElement, appendPosition) {
    parentElement.insertAdjacentElement(appendPosition, this.element);
  }
}
