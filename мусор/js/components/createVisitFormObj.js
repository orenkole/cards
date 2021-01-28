import {state, publish} from "../state/state.js";
import Form from "../classes/Form.js";
import Input from "../classes/Input.js";
import {sendCreateVisitRequest} from "../queries/sendCreateVisitRequest.js";
import {createVisitBtnObj, createVisitBtnElement} from "./createVisitBtnObj.js";
import Select from "../classes/Select.js";

export const createVisitFormObj = new Form();
export const createVisitFormElement = createVisitFormObj.element;

const SelectDoctorObj = new Select({values: ["Кардиолог", "Стоматолог", "Терапевт"]});
SelectDoctorObj.render(createVisitFormElement, "beforeend");

// change forms on select change
createVisitFormElement.addEventListener("change", () => {



})


const InputAimObj = new Input({
  placeholder: "цель визита",
  name: "visitAim",
  type: "text",
  value: ""
});
InputAimObj.render(createVisitFormElement, "beforeend");
const InputAimElement = InputAimObj.element;

const InputSubmitCreateObj = new Input({
  type: "submit",
  value: "Создать"
});
const InputSubmitCreateElement = InputSubmitCreateObj.element;
InputSubmitCreateObj.render(createVisitFormElement, "beforeend");

createVisitFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const createPromise = sendCreateVisitRequest({
    aim: InputAimElement.value,
  });
  createPromise
    .then(result => {
      console.log(result);
      publish({event: "visitCreated"});
    })
})

