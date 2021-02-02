// import HtmlElement from "../classes/HtmlElement.js";
import Div from "../classes/Div.js";
import Input from "../classes/Input.js";
import Select from "../classes/Select.js";
import Button from "../classes/Button.js";

export const SearchContainer = new Div({
  classes: ["container"],
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
  values: ["All", "Open", "Done"],

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

SearchFormWrapper.render(SearchContainer.element, "beforeend");
SearchInput.render(SearchFormWrapper.element, "beforeend");
SearchSelectCartStatus.render(SearchFormWrapper.element, "beforeend");
SearchSelectPriorityStatus.render(SearchFormWrapper.element, "beforeend");
SearchSubmitBtn.render(SearchFormWrapper.element, "beforeend");
