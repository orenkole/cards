export default class HtmlElement {
  constructor({tagName = "",
    id = "",
    classes = [],
    attributes = [],
    text = ""
  }) {
    this.tagName = tagName;
    this.id = id;
    this.classes = classes;
    this.attributes = attributes;
    this.text = text
    this.element;
    this.create();
  }
  create() {
    const element = document.createElement(this.tagName);
    if(this.id) {
      element.id = this.id;
    }
    if(this.classes.length > 0) {
      element.classList.add(...this.classes);
    }
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
