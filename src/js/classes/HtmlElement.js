export default class HtmlElement {
  constructor({
    tagName = "",
    classes = [],
    // attributes = [],
    attributes = {},
    id = "",
    text = "",
  }) {
    this.tagName = tagName;
    this.classes = classes;
    this.attributes = attributes;
    this.id = id;
    this.text = text;
    this.element;
    this.create();
  }
  create() {
    const element = document.createElement(this.tagName);
    element.classList.add(...this.classes);
    element.id = this.id;

    if (Object.keys(this.attributes).length > 0) {
      console.log(this.attributes);
      // debugger;
      for (let key in this.attributes) {
        element.setAttribute(key, this.attributes[key]);
      }
    }

    // this.attributes.forEach((attribute) => {
    //   let [[attributeName, attributeValue]] = Object.entries(attribute);
    //   element.setAttribute(attributeName, attributeValue);
    // });

    element.textContent = this.text;
    this.element = element;
    return this.element;
  }
  render(parentElement, appendPosition) {
    parentElement.insertAdjacentElement(appendPosition, this.element);
  }
}
