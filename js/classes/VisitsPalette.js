import HtmlElement from "./HtmlElement.js";
import { Visit } from "./Visit.js";
import Div from "./Div.js";
import { VisitCardiologist } from "./VisitCardiologist.js";
import { VisitDentist } from "./VisitDentist.js";
import { VisitTherapist } from "./VisitTherapist.js";
import Request from "../queries/Request.js";
import { findCards } from "../components/createFilterForm.js";

export class VisitsPalette extends HtmlElement {
  constructor() {
    super({
      tagName: "div",
      classes: ["visits-palette", "container", "row", "row-cols-1", "row-cols-md-2", "row-cols-xl-3", "g-4"]
    })
    this.allVisits;
    this.visitCards;
    this.noVisitsEl = new Div({
      classes: ["no-visits"],
      text: "No items have been added"
    });
    if(localStorage.getItem("token")) {
      this.refreshContent();
    }
  }

  async refreshContent() {
    this.element.innerHTML = "";
    await this.getAllVisits();
    this.createVisitCards();
    this.renderNoCardsCheck();
    this.renderCards();
  }

  async getAllVisits() {
    const getAllVisitsRequest = new Request()
    const allVisitsJson = await getAllVisitsRequest.sendRequest({path: "", method: "GET"});
    this.allVisits = JSON.parse(allVisitsJson);
  }

  createVisitCards() {
    this.allVisitsFiltered = findCards(this.allVisits);
    this.visitCards = this.allVisitsFiltered.map(visit => {
      switch(visit.content.doctor) {
        case "кардиолог":
          return new VisitCardiologist(visit);
        case "стоматолог":
          return new VisitDentist(visit);
        case "терапевт":
          return new VisitTherapist(visit);
        default:
          return new Visit(visit);
      }
    });
  }

  renderCards() {
    if(this.visitCards.length) {
      this.visitCards.forEach(visitCard => {
        visitCard.render(this.element, "beforeend");
      })
    }
  }

  renderNoCardsCheck() {
    if(this.visitCards.length) {
      this.noVisitsEl.element.remove();
    } else {
      this.noVisitsEl.render(this.element, "beforeend");
    }
  }

  async addVisit(visitObj) {
    const createVisitRequest = new Request();
    const createdVisitResponse = await createVisitRequest.sendRequest({body: visitObj, path: "/", method: "POST"});
    const createdVisit = JSON.parse(createdVisitResponse);

    let visitCard;
    switch(createdVisit.content.doctor) {
      case "кардиолог":
        visitCard = new VisitCardiologist(createdVisit);
        break;
      case "стоматолог":
        visitCard = new VisitDentist(createdVisit);
        break;
      case "терапевт":
        visitCard = new VisitTherapist(createdVisit);
        break;
      default:
        visitCard = new Visit(createdVisit);
    }
    this.refreshContent();
  }

  async removeVisit(card) {
    // delete from database
    const deleteCard = new Request();
    const deleteResponse = await deleteCard.sendRequest({path: `${card.visit.id}`, method: "DELETE"});
    if(deleteResponse == "") {
      card.element.remove();
    }
    this.refreshContent();
  }

  applyFilter(filteredVisits) {
    this.element.innerHTML = "";
    this.allVisits = filteredVisits;
    this.createVisitCards();
    this.renderNoCardsCheck();
    this.renderCards();
  }
}
