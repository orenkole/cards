import HtmlElement from "./HtmlElement.js";
import { Visit } from "./Visit.js";

export class VisitCardiologist extends Visit {
  constructor(visit) {
    super(visit);
    this.addSpecialFields();
  }
  async addSpecialFields() {
    const pressureItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Давление: ${this.visit.content.pressure}`
    })
    pressureItem.render(this.visitPropertiesMore.element, "beforeend");

    const massIndexItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Индекс массы: ${this.visit.content.massIndex}`
    })
    massIndexItem.render(this.visitPropertiesMore.element, "beforeend");

    const prevDiseasesItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Предыдущие заболевания: ${this.visit.content.prevDiseases}`
    })
    prevDiseasesItem.render(this.visitPropertiesMore.element, "beforeend");

    const ageItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Возраст: ${this.visit.content.age}`
    })
    ageItem.render(this.visitPropertiesMore.element, "beforeend");
  }
}
