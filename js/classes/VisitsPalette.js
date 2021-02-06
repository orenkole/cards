import HtmlElement from "./HtmlElement.js";
import { Visit } from "./Visit.js";
import Div from "./Div.js";
import { VisitCardiologist } from "./VisitCardiologist.js";
import { VisitDentist } from "./VisitDentist.js";
import { VisitTherapist } from "./VisitTherapist.js";
import Request from "../queries/Request.js";
import { findCards } from "../components/createFilterForm.js";
import { visitsPalette } from "../components/visitsPalette.js";

let zindex = 1;
export class VisitsPalette extends HtmlElement {
  constructor() {
    super({
      tagName: "div",
      classes: [
        "visits-palette",
        "container",
        "row",
        "row-cols-4",
        "g-4",
        "pb-5",
        "mx-auto",
      ],
    });
    this.allVisits;
    this.visitCards;
    this.noVisitsEl = new Div({
      classes: ["no-visits", "h4", "container", "col-6", "text-center"],
      text: "Нет добавленных визитов",
    });
    if (localStorage.getItem("token")) {
      this.refreshContent();
    } else {
      this.noVisitsEl.render(this.element, "beforeend");
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
    const getAllVisitsRequest = new Request();
    const allVisitsJson = await getAllVisitsRequest.sendRequest({
      path: "",
      method: "GET",
    });
    this.allVisits = JSON.parse(allVisitsJson);
    // console.log("VISITS", this.allVisits);
  }

  createVisitCards() {
    this.allVisitsFiltered = findCards(this.allVisits);
    this.visitCards = this.allVisitsFiltered.map((visit) => {
      switch (visit.content.doctor) {
        case "Кардиолог":
          return new VisitCardiologist(visit);
        case "Стоматолог":
          return new VisitDentist(visit);
        case "Терапевт":
          return new VisitTherapist(visit);
        default:
          return new Visit(visit);
      }
    });
  }

  async dragFunction() {
    let dragContainer = visitsPalette.element;
    dragContainer.addEventListener("mouseover", (e) => {
      if (e.target.parentNode.classList.value == "card position-absolute") {
        dragElement(e.target.parentNode);
      }
      function dragElement(elmnt) {
        let pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
          e = e || window.event;

          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
          elmnt.style.zIndex = zindex++;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.position = "absolute";
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
      if (e.target.tagName == "INPUT") {
        let blockDrag = e.target.closest(".position-absolute");
        blockDrag.onmousedown = null;
      }
    });
  }
  renderCards() {
    if (this.visitCards.length) {
      this.visitCards.forEach((visitCard, i) => {
        visitCard.render(this.element, "beforeend");
        document
          .getElementsByClassName("card")
          [i].classList.add("position-absolute");
      });
    }
  }

  renderNoCardsCheck() {
    if (this.visitCards.length) {
      this.noVisitsEl.element.remove();
    } else {
      this.noVisitsEl.render(this.element, "beforeend");
    }
  }

  async addVisit(visitObj) {
    const createVisitRequest = new Request();
    visitObj["status"] = "open";
    const createdVisitResponse = await createVisitRequest.sendRequest({
      body: visitObj,
      path: "/",
      method: "POST",
    });
    const createdVisit = JSON.parse(createdVisitResponse);

    let visitCard;
    switch (createdVisit.content.doctor) {
      case "Кардиолог":
        visitCard = new VisitCardiologist(createdVisit);
        break;
      case "Стоматолог":
        visitCard = new VisitDentist(createdVisit);
        break;
      case "Терапевт":
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
    const deleteResponse = await deleteCard.sendRequest({
      path: `${card.visit.id}`,
      method: "DELETE",
    });
    if (deleteResponse == "") {
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
