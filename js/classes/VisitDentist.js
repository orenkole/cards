import HtmlElement from "./HtmlElement.js";
import { Visit } from "./Visit.js";

export class VisitDentist extends Visit {
  constructor(visit) {
    super(visit);
    this.addSpecialFields();
  }
  async addSpecialFields() {
    const lastDateItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Дата последнего визита: ${this.visit.content.lastDateItem}`
    })
    lastDateItem.render(this.visitPropertiesMore.element, "beforeend");
  }
}
