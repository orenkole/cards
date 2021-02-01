export default class HtmlElement {
  constructor({ tagName = "", classes = [], attributes = {}, text = "" }) {
    this.tagName = tagName;
    this.classes = classes;
    this.attributes = attributes;
    this.text = text;
    this.element;
    this.create();
  }
  create() {
    const element = document.createElement(this.tagName);
    element.classList.add(...this.classes);

    if (Object.keys(this.attributes).length > 0) {
      // console.log(this.attributes);
      for (let key in this.attributes) {
        element.setAttribute(key, this.attributes[key]);
      }
    }

    element.textContent = this.text;
    this.element = element;
    return this.element;
  }
  render(parentElement, appendPosition) {
    parentElement.insertAdjacentElement(appendPosition, this.element);
  }
}
