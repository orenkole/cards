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
		this.doctors = ["кардиолог", "стоматолог", "терапевт"]

		this.doctorSelect = new Select({
			classes: ["form-select"],
			name: "doctor"
		})
		this.optionDefault = new HtmlElement({
			tagName: "option",
			attributes: [
				{"selected": ""}
			],
			text: "Выберите врача"
		})

		this.optionDefault.render(this.doctorSelect.element, "beforeend");
		this.doctors.forEach(doctor => {
			const option = new HtmlElement({
				tagName: "option",
				text: doctor,
				value: doctor
			})
			option.render(this.doctorSelect.element, "beforeend");
		})
		this.doctorSelect.render(this.element, "beforeend");

		this.mb3Purpose = new Div({classes: ["mb-3"]});
		this.mb3ShortDescr = new Div({classes: ["mb-3"]});
		this.mb3Name = new Div({classes: ["mb-3"]});
		this.mb3SecondName = new Div({classes: ["mb-3"]});
		this.mb3ByFather = new Div({classes: ["mb-3"]});
		this.mb3Age = new Div({classes: ["mb-3"]});
		this.mb3PrevDiseases = new Div({classes: ["mb-3"]});
		this.mb3MassIndex = new Div({classes: ["mb-3"]});
		this.mb3Pressure = new Div({classes: ["mb-3"]});
		this.mb3LastVisit = new Div({classes: ["mb-3"]});


		// purpose input
		this.purposeLabel = new Label({
			for: "purpose",
			classes: ["form-label"],
			text: "Цель визита",
		})
		this.purposeLabel.render(this.mb3Purpose.element, "beforeend");
		this.purposeInput = new Input({
			id: "purpose",
			classes: ["form-control"],
			type: "text",
			name: "purpose"
		})
		this.purposeInput.render(this.mb3Purpose.element, "beforeend");

			// short description
		this.shortDescrLabel = new Label({
			for: "short-description",
			text: "Краткое описание визита"
		})
		this.shortDescrLabel.render(this.mb3ShortDescr.element, "beforeend");
		this.shortDescrTextarea = new Textarea({
			classes: ["form-control"],
			id: "short-description",
			attributes: [
				{"style": "height: 100px;"}
			],
			name: "shortDesription"
		})
		this.shortDescrTextarea.render(this.mb3ShortDescr.element, "beforeend");

		this.urgencies = ["обычная", "приоритетная", "неотложная"]

		this.urgencySelect = new Select({
			classes: ["form-select"],
			name: "urgency"
		})
		this.urgencyOptionDefault = new HtmlElement({
			tagName: "option",
			attributes: [
				{"selected": ""}
			],
			text: "Выберите срочность визита"
		})
		this.urgencyOptionDefault.render(this.urgencySelect.element, "beforeend");
		this.urgencies.forEach(urgency => {
			const option = new HtmlElement({
				tagName: "option",
				text: urgency,
				value: urgency
			})
			option.render(this.urgencySelect.element, "beforeend");
		})

		// name input
		this.nameLabel = new Label({
			for: "name",
			classes: ["form-label"],
			text: "Имя"
		})
		this.nameLabel.render(this.mb3Name.element, "beforeend");
		this.nameInput = new Input({
			id: "name",
			classes: ["form-control"],
			type: "text",
			name: "name"
		})
		this.nameInput.render(this.mb3Name.element, "beforeend");


		// second name input
		this.secondNameLabel = new Label({
			for: "second-name",
			classes: ["form-label"],
			text: "Фамилия"
		})
		this.secondNameLabel.render(this.mb3SecondName.element, "beforeend");
		this.secondNameInput = new Input({
			id: "second-name",
			classes: ["form-control"],
			type: "text",
			name: "secondName"
		})
		this.secondNameInput.render(this.mb3SecondName.element, "beforeend");

		// by father name input
		this.byFatherLabel = new Label({
			for: "by-father",
			classes: ["form-label"],
			text: "По отчеству"
		})
		this.byFatherLabel.render(this.mb3ByFather.element, "beforeend");
		this.byFatherInput = new Input({
			id: "by-father",
			classes: ["form-control"],
			type: "text",
			name: "byFather"
		})
		this.byFatherInput.render(this.mb3ByFather.element, "beforeend");

		// age
		this.ageLabel = new Label({
			for: "age",
			classes: ["form-label"],
			text: "Возраст"
		})
		this.ageLabel.render(this.mb3Age.element, "beforeend");
		this.ageInput = new Input({
			id: "age",
			classes: ["form-control"],
			type: "number",
			name: "age"
		})
		this.ageInput.render(this.mb3Age.element, "beforeend");

		// previous diseases
		this.prevDiseasesLabel = new Label({
			for: "prev-diseases",
			text: "Перенесенные заболевания"
		})
		this.prevDiseasesLabel.render(this.mb3PrevDiseases.element, "beforeend");
		this.prevDiseasesTextarea = new Textarea({
			classes: ["form-control"],
			id: "prev-diseases",
			attributes: [
				{"style": "height: 100px;"}
			],
			name: "prevDiseases"
		})
		this.prevDiseasesTextarea.render(this.mb3PrevDiseases.element, "beforeend");

		// mass index
		this.massIndexLabel = new Label({
			for: "mass-index",
			classes: ["form-label"],
			text: "Индекс массы"
		})
		this.massIndexLabel.render(this.mb3MassIndex.element, "beforeend");
		this.massIndexInput = new Input({
			id: "mass-index",
			classes: ["form-control"],
			type: "number",
			name: "massIndex"
		})
		this.massIndexInput.render(this.mb3MassIndex.element, "beforeend");


		// pressure
		this.pressureLabel = new Label({
			for: "pressure",
			classes: ["form-label"],
			text: "Давление"
		})
		this.pressureLabel.render(this.mb3Pressure.element, "beforeend");
		this.pressureInput = new Input({
			id: "pressure",
			classes: ["form-control"],
			type: "number",
			name: "pressure"
		})
		this.pressureInput.render(this.mb3Pressure.element, "beforeend");


		// last visit date
		this.lastVisitLabel = new Label({
			for: "last-visit",
			classes: ["form-label"],
			text: "Дата последнего визита"
		})
		this.lastVisitLabel.render(this.mb3LastVisit.element, "beforeend");
		this.lastVisitInput = new Input({
			id: "last-visit",
			classes: ["form-control"],
			type: "date",
			name: "lastVisitDate"
		})
		this.lastVisitInput.render(this.mb3LastVisit.element, "beforeend");

		// control buttons
		this.buttonsRow = new Div({classes: ["d-md-block"]})

		this.submitBtn = new Button({
			type: "submit",
			text: "Submit",
			classes: ["btn", "btn-primary", "me-4", "col"]
		})
		this.submitBtn.render(this.buttonsRow.element, "beforeend");

		this.cancelBtn = new Button({
			type: "button",
			text: "Cancel",
			classes: ["btn", "btn-secondary", "col"],
			attributes: [{"data-bs-dismiss": "modal"}]
		})
		this.cancelBtn.element.addEventListener("click", () => {
			this.element.reset();
		})
		this.cancelBtn.render(this.buttonsRow.element, "beforeend");
	}

	gatherForm() {
		this.doctorSelect.element.addEventListener("change", () => {
			while (this.element.children.length > 1) {
				this.element.removeChild(this.element.lastChild);
			}
			switch(this.doctorSelect.element.value) {
				case "кардиолог":
					this.mb3Purpose.render(this.element, "beforeend");
					this.mb3ShortDescr.render(this.element, "beforeend");
					this.urgencySelect.render(this.element, "beforeend");
					this.mb3Pressure.render(this.element, "beforeend");
					this.mb3MassIndex.render(this.element, "beforeend");
					this.mb3PrevDiseases.render(this.element, "beforeend");
					this.mb3Age.render(this.element, "beforeend");
					this.mb3Name.render(this.element, "beforeend")
					this.mb3SecondName.render(this.element, "beforeend");
					this.mb3ByFather.render(this.element, "beforeend");
					this.buttonsRow.render(this.element, "beforeend")
					break;
				case "стоматолог":
					this.mb3Purpose.render(this.element, "beforeend");
					this.mb3ShortDescr.render(this.element, "beforeend");
					this.urgencySelect.render(this.element, "beforeend");
					this.mb3LastVisit.render(this.element, "beforeend")
					this.mb3Name.render(this.element, "beforeend")
					this.mb3SecondName.render(this.element, "beforeend");
					this.mb3ByFather.render(this.element, "beforeend");
					this.buttonsRow.render(this.element, "beforeend")
					break;
				case "терапевт":
					this.mb3Purpose.render(this.element, "beforeend");
					this.mb3ShortDescr.render(this.element, "beforeend");
					this.urgencySelect.render(this.element, "beforeend");
					this.mb3Age.render(this.element, "beforeend")
					this.mb3Name.render(this.element, "beforeend")
					this.mb3SecondName.render(this.element, "beforeend");
					this.mb3ByFather.render(this.element, "beforeend");
					this.buttonsRow.render(this.element, "beforeend")
					break;
				default:
			}
		})
	}
}
