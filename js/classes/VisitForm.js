import Form from "./Form.js";
import Div from "./Div.js";
import Label from "./Label.js";
import Input from "./Input.js";
import Button from "./Button.js";
import Select from "./Select.js";
import Textarea from "./Textarea.js";
import HtmlElement from "./HtmlElement.js";
import { visitsPalette } from "../components/visitsPalette.js";

// create modal
export class VisitForm extends Form {
  constructor() {
    super();
    this.createVisitFormParts();
    this.gatherForm();
  }

  createVisitFormParts() {
    /* doctor selection field */
    this.doctors = ["Кардиолог", "Стоматолог", "Терапевт"];

    this.doctorSelect = new Select({
      classes: ["form-select"],
      name: "doctor",
      attributes: [{ required: true }],
    });
    this.optionDefault = new HtmlElement({
      tagName: "option",
      attributes: [{ selected: "" }, { disabled: "" }],
      text: "Выберите врача",
    });

    this.optionDefault.render(this.doctorSelect.element, "beforeend");
    this.doctors.forEach((doctor) => {
      const option = new HtmlElement({
        tagName: "option",
        text: doctor,
        value: doctor,
      });
      option.render(this.doctorSelect.element, "beforeend");
    });
    this.doctorSelect.render(this.element, "beforeend");

    this.mb3Purpose = new Div({ classes: ["mb-1"] });
    this.mb3ShortDescr = new Div({ classes: ["mb-1"] });
    this.mb3Name = new Div({ classes: ["mb-1"] });
    this.mb3SecondName = new Div({ classes: ["mb-1"] });
    this.mb3ByFather = new Div({ classes: ["mb-1"] });
    this.mb3Age = new Div({ classes: ["mb-1"] });
    this.mb3PrevDiseases = new Div({ classes: ["mb-1"] });
    this.mb3MassIndex = new Div({ classes: ["mb-1"] });
    this.mb3Pressure = new Div({ classes: ["mb-1"] });
    this.mb3LastVisit = new Div({ classes: ["mb-1"] });

    // purpose input
    this.purposeLabel = new Label({
      for: "purpose",
      classes: ["form-label"],
      text: "Цель визита",
    });
    this.purposeLabel.render(this.mb3Purpose.element, "beforeend");
    this.purposeInput = new Input({
      id: "purpose",
      classes: ["form-control"],
      type: "text",
      name: "purpose",
      attributes: [{ required: true }],
    });
    this.purposeInput.render(this.mb3Purpose.element, "beforeend");

    // short description
    this.shortDescrLabel = new Label({
      for: "short-description",
      text: "Краткое описание визита",
    });
    this.shortDescrLabel.render(this.mb3ShortDescr.element, "beforeend");
    this.shortDescrTextarea = new Textarea({
      classes: ["form-control"],
      id: "short-description",
      attributes: [{ style: "height: 100px;" }],
      name: "shortDesription",
    });
    this.shortDescrTextarea.render(this.mb3ShortDescr.element, "beforeend");

    this.urgencies = ["Обычная", "Приоритетная", "Неотложная"];

    this.urgencySelectLabel = new Label({
      for: "urgency",
      text: "Выберите срочность",
    });
    this.urgencySelectLabel.render(this.mb3ShortDescr.element, "beforeend");

    this.urgencySelect = new Select({
      classes: ["form-select"],
      name: "urgency",
    });
    // this.urgencyOptionDefault = new HtmlElement({
    //   tagName: "option",
    //   attributes: [{ selected: "" }],
    //   text: "Выберите срочность визита",
    // });
    // this.urgencyOptionDefault.render(this.urgencySelect.element, "beforeend");
    this.urgencies.forEach((urgency) => {
      const option = new HtmlElement({
        tagName: "option",
        text: urgency,
        value: urgency,
      });
      option.render(this.urgencySelect.element, "beforeend");
    });

    // name input
    this.nameLabel = new Label({
      for: "name",
      classes: ["form-label"],
      text: "Имя",
    });
    this.nameLabel.render(this.mb3Name.element, "beforeend");
    this.nameInput = new Input({
      id: "name",
      classes: ["form-control"],
      type: "text",
      name: "name",
      attributes: [{ required: true }],
    });
    this.nameInput.render(this.mb3Name.element, "beforeend");

    // second name input
    this.secondNameLabel = new Label({
      for: "second-name",
      classes: ["form-label"],
      text: "Фамилия",
    });
    this.secondNameLabel.render(this.mb3SecondName.element, "beforeend");
    this.secondNameInput = new Input({
      id: "second-name",
      classes: ["form-control"],
      type: "text",
      name: "secondName",
      attributes: [{ required: true }],
    });
    this.secondNameInput.render(this.mb3SecondName.element, "beforeend");

    // by father name input
    this.byFatherLabel = new Label({
      for: "by-father",
      classes: ["form-label"],
      text: "По отчеству",
    });
    this.byFatherLabel.render(this.mb3ByFather.element, "beforeend");
    this.byFatherInput = new Input({
      id: "by-father",
      classes: ["form-control"],
      type: "text",
      name: "byFather",
      attributes: [{ required: true }],
    });
    this.byFatherInput.render(this.mb3ByFather.element, "beforeend");

    // age
    this.ageLabel = new Label({
      for: "age",
      classes: ["form-label"],
      text: "Возраст",
    });
    this.ageLabel.render(this.mb3Age.element, "beforeend");
    this.ageInput = new Input({
      id: "age",
      classes: ["form-control"],
      type: "number",
      name: "age",
      attributes: [{ required: true }],
    });
    this.ageInput.render(this.mb3Age.element, "beforeend");

    // previous diseases
    this.prevDiseasesLabel = new Label({
      for: "prev-diseases",
      text: "Перенесенные заболевания",
    });
    this.prevDiseasesLabel.render(this.mb3PrevDiseases.element, "beforeend");
    this.prevDiseasesTextarea = new Textarea({
      classes: ["form-control"],
      id: "prev-diseases",
      attributes: [{ style: "height: 100px;" }],
      name: "prevDiseases",
      attributes: [{ required: true }],
    });
    this.prevDiseasesTextarea.render(this.mb3PrevDiseases.element, "beforeend");

    // mass index
    this.massIndexLabel = new Label({
      for: "mass-index",
      classes: ["form-label"],
      text: "Индекс массы",
    });
    this.massIndexLabel.render(this.mb3MassIndex.element, "beforeend");
    this.massIndexInput = new Input({
      id: "mass-index",
      classes: ["form-control"],
      type: "number",
      name: "massIndex",
      attributes: [{ required: true }],
    });
    this.massIndexInput.render(this.mb3MassIndex.element, "beforeend");

    // pressure
    this.pressureLabel = new Label({
      for: "pressure",
      classes: ["form-label"],
      text: "Давление",
    });
    this.pressureLabel.render(this.mb3Pressure.element, "beforeend");
    this.pressureInput = new Input({
      id: "pressure",
      classes: ["form-control"],
      type: "text",
      name: "pressure",
      attributes: [{ required: true }],
    });
    this.pressureInput.render(this.mb3Pressure.element, "beforeend");

    // last visit date
    this.lastVisitLabel = new Label({
      for: "last-visit",
      classes: ["form-label"],
      text: "Дата последнего визита",
    });
    this.lastVisitLabel.render(this.mb3LastVisit.element, "beforeend");
    this.lastVisitInput = new Input({
      id: "last-visit",
      classes: ["form-control"],
      type: "date",
      name: "lastVisitDate",
    });
    this.lastVisitInput.render(this.mb3LastVisit.element, "beforeend");

    // control buttons
    this.buttonsRow = new Div({ classes: ["d-md-block"] });

    this.submitBtn = new Button({
      type: "submit",
      text: "Отправить",
      classes: ["btn", "btn-success", "me-4", "col"],
    });
    this.submitBtn.render(this.buttonsRow.element, "beforeend");

    this.cancelBtn = new Button({
      type: "button",
      text: "Отмена",
      classes: ["btn", "btn-secondary", "col"],
      attributes: [{ "data-bs-dismiss": "modal" }],
    });
  }

  gatherForm() {
    this.doctorSelect.element.addEventListener("change", () => {
      while (this.element.children.length > 1) {
        this.element.removeChild(this.element.lastChild);
      }
      switch (this.doctorSelect.element.value) {
        case "Кардиолог":
          this.mb3Purpose.render(this.element, "beforeend");
          this.mb3ShortDescr.render(this.element, "beforeend");
          this.urgencySelect.render(this.element, "beforeend");
          this.mb3Pressure.render(this.element, "beforeend");
          this.mb3MassIndex.render(this.element, "beforeend");
          this.mb3PrevDiseases.render(this.element, "beforeend");
          this.mb3Age.render(this.element, "beforeend");
          this.mb3Name.render(this.element, "beforeend");
          this.mb3SecondName.render(this.element, "beforeend");
          this.mb3ByFather.render(this.element, "beforeend");
          this.buttonsRow.render(this.element, "beforeend");
          break;
        case "Стоматолог":
          this.mb3Purpose.render(this.element, "beforeend");
          this.mb3ShortDescr.render(this.element, "beforeend");
          this.urgencySelect.render(this.element, "beforeend");
          this.mb3LastVisit.render(this.element, "beforeend");
          this.mb3Name.render(this.element, "beforeend");
          this.mb3SecondName.render(this.element, "beforeend");
          this.mb3ByFather.render(this.element, "beforeend");
          this.buttonsRow.render(this.element, "beforeend");
          break;
        case "Терапевт":
          this.mb3Purpose.render(this.element, "beforeend");
          this.mb3ShortDescr.render(this.element, "beforeend");
          this.urgencySelect.render(this.element, "beforeend");
          this.mb3Age.render(this.element, "beforeend");
          this.mb3Name.render(this.element, "beforeend");
          this.mb3SecondName.render(this.element, "beforeend");
          this.mb3ByFather.render(this.element, "beforeend");
          this.buttonsRow.render(this.element, "beforeend");
          break;
        default:
      }
    });
  }

  fillWithValues(visit) {
    this.doctorSelect.element.value = visit.content.doctor;
    const changeEvent = new Event("change");
    this.doctorSelect.element.dispatchEvent(changeEvent);

    switch (visit.content.doctor) {
      case "Кардиолог":
        this.purposeInput.element.value = visit.content.purpose;
        this.shortDescrTextarea.element.value = visit.content.shortDesription;
        this.urgencySelect.element.value = visit.content.urgency;
        this.pressureInput.element.value = visit.content.pressure;
        this.massIndexInput.element.value = visit.content.massIndex;
        this.prevDiseasesTextarea.element.value = visit.content.prevDiseases;
        this.ageInput.element.value = visit.content.age;
        this.nameInput.element.value = visit.content.name;
        this.secondNameInput.element.value = visit.content.secondName;
        this.byFatherInput.element.value = visit.content.byFather;
        break;
      case "Стоматолог":
        this.purposeInput.element.value = visit.content.purpose;
        this.shortDescrTextarea.element.value = visit.content.shortDesription;
        this.urgencySelect.element.value = visit.content.urgency;
        this.lastVisitInput.element.value = visit.content.lastVisitDate;
        this.nameInput.element.value = visit.content.name;
        this.secondNameInput.element.value = visit.content.secondName;
        this.byFatherInput.element.value = visit.content.byFather;
        break;
      case "Терапевт":
        this.purposeInput.element.value = visit.content.purpose;
        this.shortDescrTextarea.element.value = visit.content.shortDesription;
        this.urgencySelect.element.value = visit.content.urgency;
        this.ageInput.element.value = visit.content.age;
        this.nameInput.element.value = visit.content.name;
        this.secondNameInput.element.value = visit.content.secondName;
        this.byFatherInput.element.value = visit.content.byFather;
        break;
    }
  }
}
