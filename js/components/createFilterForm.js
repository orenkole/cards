// import HtmlElement from "../classes/HtmlElement.js";
import Div from "../classes/Div.js";
import Input from "../classes/Input.js";
import Select from "../classes/Select.js";
import Button from "../classes/Button.js";
import Request from "../queries/Request.js";
import Form from "../classes/Form.js";
import { visitsPalette } from "./visitsPalette.js";

export const SearchContainer = new Form({
  classes: ["container"],
  attributes: [{ onsubmit: "return false" }],
});

const SearchFormWrapper = new Div({
  classes: ["input-group", "mb-3"],
});

const SearchInput = new Input({
  type: "text",
  classes: ["form-control", "col-5"],
});

const SearchSelectCartStatus = new Select({
  classes: ["form-select", "col-3"],

  // values - сверить с готовой карточкой
  values: ["Все", "Открытые", "Закрытые"],

  attributes: [{ selected: "" }],
});

const SearchSelectPriorityStatus = new Select({
  classes: ["form-select", "col-3"],
  values: ["Любая срочность", "обычная", "приоритетная", "неотложная"],
});

const SearchSubmitBtn = new Button({
  classes: ["btn", "btn-primary"],
  type: "submit",
  text: "Search",
});

SearchContainer.element.addEventListener("submit", (e) => {
  e.preventDefault();

  const SearchRequest = new Request();
  const CardsArray = SearchRequest.sendRequest({
    path: "",
    method: "GET",
  });

  CardsArray.then((data) => {
    const CardsArray = JSON.parse(data);
    const result = findCards(CardsArray);
    //
    //
    console.log(result);
    visitsPalette.applyFilter(result);
    //
    //
  }).catch((err) => {
    console.log(err);
  });
});

export function findCards(array) {
  const textData = SearchInput.element.value;
  const cardStatus = SearchSelectCartStatus.element.value;
  const priority = SearchSelectPriorityStatus.element.value;

  if (priority !== "Любая срочность") {
    array.forEach((card) => {
      if (card.content.urgency !== priority) {
        array.splice(array.indexOf(card)), 1;
      }
    });
  }

  //   if (-------- !== "Все") {
  //     array.forEach((card) => {
  //         if (card.content.------- !== cardStatus) {
  //           array.splice(array.indexOf(card)), 1;
  //         }
  //       });
  //   }

  const result = [];

  console.log(array);

  array.forEach((card) => {
    for (let key in card.content) {
      if (card.content[key].includes(textData)) {
        if (!result.includes(card)) {
          result.push(card);
        }
      }
    }
  });

  return result;
}

// render Search Form
SearchFormWrapper.render(SearchContainer.element, "beforeend");
SearchInput.render(SearchFormWrapper.element, "beforeend");
SearchSelectCartStatus.render(SearchFormWrapper.element, "beforeend");
SearchSelectPriorityStatus.render(SearchFormWrapper.element, "beforeend");
SearchSubmitBtn.render(SearchFormWrapper.element, "beforeend");
