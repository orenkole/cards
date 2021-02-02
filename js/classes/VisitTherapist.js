import HtmlElement from "./HtmlElement.js";
import { Visit } from "./Visit.js";

export class VisitTherapist extends Visit {
  constructor(visit) {
    super(visit);
    this.addSpecialFields();
  }
  async addSpecialFields() {
    const ageItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Возраст: ${this.visit.content.age}`
    })
    ageItem.render(this.visitPropertiesMore.element, "beforeend");
  }
}
