import Button from "./Button.js";
import HtmlElement from "./HtmlElement.js";
import { visitsPalette } from "../components/visitsPalette.js";
import Div from "./Div.js";
import { VisitForm } from "./VisitForm.js";
import Request from "../queries/Request.js";
import Label from "./Label.js";
import Input from "./Input.js";

export class Visit extends HtmlElement {
  constructor(visit) {
    super({
      tagName: "div",
      classes: ["p-1", "d-flex", "justify-content-center", "mb-4"],
      attributes: [
        {
          style: "height: 250px",
        },
      ],
    });
    this.createVisitForm = new VisitForm();
    this.visit = visit;
    // console.log("VISIT CARD: ", this.visit);
    this.visitPropertiesStart;
    this.addDefaultFields();
    this.addControls();
    this.style;
  }
  async addDefaultFields() {
    this.cardElement = new Div({
      classes: ["card"],
      attributes: [
        {
          style: "width: 300px; min-height: 250px;  ", //// КОЛХОЗ НА ШИРИНУ
        },
      ],
    });
    this.cardHeader = new Div({
      classes: ["card-header", "d-flex", "justify-content-between"],
    });
    this.cardHeader.render(this.cardElement.element, "beforeend");

    this.cardElement.render(this.element, "beforeend");
    this.cardBody = new Div({
      classes: [
        "card-body",
        "d-flex",
        "flex-column",
        "justify-content-between",
      ],
    });
    this.cardBody.render(this.cardElement.element, "beforeend");
    this.visitPropertiesStart = new HtmlElement({
      tagName: "ul",
      classes: ["list-group", "mb-1"],
      attributes: [
        {
          style: "list-style: none;",
        },
      ],
    });

    const nameItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      attributes: [
        {
          style: "height: 66px",
        },
      ],
      text: `Имя пациента: ${this.visit.content.name} ${this.visit.content.secondName} ${this.visit.content.byFather}`,
    });
    nameItem.render(this.visitPropertiesStart.element, "beforeend");

    const doctorItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Врач: ${this.visit.content.doctor}`,
    });
    doctorItem.render(this.visitPropertiesStart.element, "beforeend");

    this.showMoreBtn = new Button({
      classes: ["btn", "btn-dark", "btn-sm", "mb-3", "mt-3"],
      type: "button",
      attributes: [
        { "data-bs-toggle": "collapse" },
        { "data-bs-target": `#moreProperties_${this.visit.id}` },
      ],
      text: "Показать больше",
    });
    this.showMoreBtn.element.addEventListener("click", () => {
      this.showLessBtn.element.style.display = "inline-block";
      this.showMoreBtn.element.style.display = "none";
      let showMoreWiden = document.getElementById(
        "moreProperties_" + this.visit.id
      );

      showMoreWiden.closest(".card").style.position = "absolute";
      showMoreWiden.closest(".card").style.width = "380px";
    });

    this.showLessBtn = new Button({
      classes: ["btn", "btn-dark", "btn-sm", "mb-3", "mt-3"],
      type: "button",
      attributes: [
        { "data-bs-toggle": "collapse" },
        { "data-bs-target": `#moreProperties_${this.visit.id}` },
      ],
      text: "Показать меньше",
    });
    this.showLessBtn.element.style.display = "none";
    this.showLessBtn.element.addEventListener("click", () => {
      this.hideChangeButtons();
      this.showMoreBtn.element.style.display = "inline-block";
      this.showLessBtn.element.style.display = "none";
      let showLessNarrower = document.getElementById(
        "moreProperties_" + this.visit.id
      );
      showLessNarrower.closest(".card").style.width = "300px";
    });

    this.moreBlock = new Div({
      id: `moreProperties_${this.visit.id}`,
      classes: ["collapse", "position-relative"],
    });

    this.visitPropertiesMore = new HtmlElement({
      tagName: "ul",
      classes: ["list-group", "mb-4"],
      attributes: [
        {
          style: "list-style: none;",
        },
      ],
    });

    const purposeItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Цель визита: ${this.visit.content.purpose}`,
      attributes: [{ required: true }],
    });
    purposeItem.render(this.visitPropertiesMore.element, "beforeend");

    const shortDescrItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Краткое описание визита: ${this.visit.content.shortDesription}`,
      attributes: [{ required: true }],
    });
    shortDescrItem.render(this.visitPropertiesMore.element, "beforeend");

    const urgencyItem = new HtmlElement({
      tagName: "li",
      classes: ["list-group-item"],
      text: `Срочность: ${this.visit.content.urgency}`,
    });
    urgencyItem.render(this.visitPropertiesMore.element, "beforeend");

    this.visitPropertiesStart.render(this.cardBody.element, "beforeend");
    this.visitPropertiesMore.render(this.moreBlock.element, "beforeend");
    this.showMoreBtn.render(this.cardBody.element, "beforeend");
    this.showLessBtn.render(this.cardBody.element, "beforeend");
    this.moreBlock.render(this.cardBody.element, "beforeend");
  }
  addControls() {
    /* status checkbox */
    const checkboxForm = new Div({
      classes: ["form-check"],
    });
    checkboxForm.render(this.cardHeader.element, "beforeend");
    this.isCheked = this.visit.content.status == "finished" ? true : false;
    this.chekckboxInput = new Input({
      type: "checkbox",
      value: "",
      id: "status-checkbox",
      classes: ["form-check-input"],
    });
    this.chekckboxInput.element.checked = this.isCheked;
    this.chekckboxInput.render(checkboxForm.element, "beforeend");

    const checkboxLabel = new Label({
      classes: ["form-check-label"],
      for: "status-checkbox",
      text: "Визит окончен",
    });
    checkboxLabel.render(checkboxForm.element, "beforeend");

    this.chekckboxInput.element.addEventListener("change", () => {
      this.handleCheckbox();
    });

    /* Close button */
    this.closeBtn = new Button({
      type: "button",
      classes: ["btn-close", "float-end"],
    });
    this.closeBtn.render(this.cardHeader.element, "beforeend");
    this.closeBtn.element.addEventListener("click", () => {
      visitsPalette.removeVisit(this);
    });

    /* Edit button */
    this.EditBtn = new Button({
      classes: ["btn", "btn-dark", "mb-3"],
      text: "Редактировать",
    });
    this.EditBtn.render(this.moreBlock.element, "beforeend");
    this.changeButtonsContainer = new Div({ classes: ["d-md-block", "mt-2"] });

    /* Delete button */
    this.deleteBtn = new Button({
      classes: ["btn", "btn-danger", "me-4", "col"],
      text: "Удалить",
    });
    this.deleteBtn.render(this.changeButtonsContainer.element, "beforeend");
    this.deleteBtn.element.addEventListener("click", () => {
      visitsPalette.removeVisit(this);
    });

    /* Change button */
    this.changeBtn = new Button({
      classes: ["btn", "btn-success", "me-4", "col"],
      text: "Изменить",
    });
    this.changeBtn.render(this.changeButtonsContainer.element, "beforeend");
    this.changeBtn.element.addEventListener("click", () => {
      this.showEditForm();
    });

    /* listen to Edit click */
    this.EditBtn.element.addEventListener("click", () => {
      this.showChangeButtons();
    });
  }
  showChangeButtons() {
    /* render Change and Delete buttons container */
    this.changeButtonsContainer.render(this.moreBlock.element, "beforeend");
  }
  hideChangeButtons() {
    this.changeButtonsContainer.element.remove();
  }
  showEditForm() {
    this.cardBody.element.innerHTML = "";
    this.createVisitForm.render(this.cardBody.element);
    /* gather form */
    this.createVisitForm.fillWithValues(this.visit);
    this.createVisitForm.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.changeCardInfo();
    });
  }
  async changeCardInfo() {
    const visitObj = {};
    const formData = new FormData(this.createVisitForm.element);
    formData.forEach((value, key) => {
      visitObj[key] = value;
    });
    visitObj["status"] = this.chekckboxInput.element.checked
      ? "finished"
      : "open";
    const changeInfoRequest = new Request();
    const createdVisitResponse = await changeInfoRequest.sendRequest({
      body: visitObj,
      path: `${this.visit.id}`,
      method: "PUT",
    });
    await visitsPalette.refreshContent();
  }

  async handleCheckbox() {
    const visitObj = this.visit.content;
    visitObj["status"] = this.chekckboxInput.element.checked
      ? "finished"
      : "open";
    const changeInfoRequest = new Request();
    const createdVisitResponse = await changeInfoRequest.sendRequest({
      body: visitObj,
      path: `${this.visit.id}`,
      method: "PUT",
    });
  }
}
