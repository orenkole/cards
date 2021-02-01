const URI = "https://ajax.test-danit.com/api/cards/login";
const login = { email: "com@com.com", password: "111111" };
let tok = localStorage.getItem("token");

const sendLogin = async function sendLogin() {
  response = await fetch(URI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
  });
  console.log(JSON.stringify(login));
  let token = await response.text();
  localStorage.setItem("token", token);
  console.log(token);
  let loginb = document.getElementById("login");
  loginb.classList.add("visually-hidden");
  let create = document.getElementById("create");
  create.classList.remove("visually-hidden");
  return token;
};

if (tok == null) {
  console.log("sss");
  let login = document.getElementById("login");
  login.addEventListener("click", sendLogin);

  ///должна стоять кнопка логин
} else {
  // должна стоять кнопка криейт
  console.log("rewq");
  let loginb = document.getElementById("login");
  loginb.classList.add("visually-hidden");
  let create = document.getElementById("create");
  create.classList.remove("visually-hidden");
}

// function confirmButton() {
//   let confirmButton = document.createElement("button");

//   confirmButton.textContent = "Создать";
//   confirmButton.classList.add("btn", "btn-primary");
//   // confirmButton.setAttribute("data-bs-dismiss", "modal");
//   document
//     .getElementById("doctor_list")
//     .getElementsByClassName("modal-footer")[0]
//     .append(confirmButton);
// }

///////////////////////
let heightZIndex = 9;
let globalObjectCards = {};
let tableEmpty;
let board;
// let dragged;
// let shiftX;
// let shiftY;

window.addEventListener("load", function () {
  board = document.getElementById("board");

  tableEmpty = document.getElementById("emptyBoard");

  Visit.restoreCards();

  document.getElementById("create").addEventListener("click", function () {
    document.body.prepend(
      createWindow(function () {
        return Visit.createSelect();
      })
    );
  });
});

// function getCoords(elem) {
//   const coords = elem.getBoundingClientRect();
//   return {
//     top: coords.top + pageYOffset,
//     left: coords.left + pageXOffset,
//   };
// }

// function dragOver(event) {
//   event.preventDefault();
// }

// function dragDrop(event) {
//   const board = document.getElementById("board");
//   dragged.style.left = event.pageX - board.offsetLeft - shiftX + "px";
//   dragged.style.top = event.pageY - board.offsetTop - shiftY + "px";
//   globalObjectCards[dragged.id].position = {
//     left: dragged.style.left,
//     top: dragged.style.top,
//   };
//   updateLocalStrg("globalObjectCards", globalObjectCards);
// }

function createElement(
  tag,
  classCSSArray = [],
  id = "",
  placeHolder = "",
  required = false,
  text = ""
) {
  if (tag) {
    let element = document.createElement(tag);
    if (Array.isArray(classCSSArray)) {
      classCSSArray.forEach((classCSS) => {
        element.classList.add(classCSS);
      });
      if (id) {
        element.id = id;
      }
      if (placeHolder) {
        element.placeholder = placeHolder;
      }
      if (required) {
        element.required = required;
      }
      if (text) {
        element.innerHTML = text;
      }
      if (tag.toUpperCase() === "textarea".toUpperCase()) {
        element.onpaste = function () {
          return false;
        };
        element.setAttribute("maxlength", "400");
      }
    } else {
      throw Error("didn't pass array classes css");
    }
    return element;
  } else {
    throw Error("didn’t pass tag");
  }
}

function createTrTable(array) {
  let tr = createElement("tr", ["tr"]);
  array.forEach((element) => {
    tr.appendChild(createElement("td", ["td"], "", "", false, element));
  });
  return tr;
}

function createWindow(createFields) {
  const dialogWrap = createElement("div", ["modal_dialog"], "dialog");
  dialogWrap.style.height = document.documentElement.scrollHeight + "px";
  const dialogWindow = createElement("div", ["dialog__window"]);
  const dialogClose = createElement(
    "span",
    ["dialog__close", "me-3"],
    "",
    "",
    false,
    "&#10006"
  );
  dialogWrap.appendChild(dialogWindow);
  dialogWindow.appendChild(dialogClose);

  dialogClose.after(createFields());

  dialogWrap.addEventListener("click", (event) => {
    if (event.target === event.currentTarget || event.target === dialogClose) {
      event.currentTarget.remove();
    }
  });

  return dialogWrap;
}

function updateLocalStrg(key, obj) {
  if (obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

class Visit {
  constructor(name, purposeVisit, visitDesc, id) {
    this.name = name;
    this.purposeVisit = purposeVisit;
    this.visitDesc = visitDesc;
    // this.visitDate = visitDate;
    // this.additionalComments = additionalComments;
    this.id = id;
    // this.urgency = urgency;
    // this.position = position;
  }

  static createField() {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(
      createElement("input", ["form__input"], "name", "ФИО", true)
    );

    fragment.appendChild(
      createElement(
        "input",
        ["form__input"],
        "purposeVisit",
        "Цель визита",
        true
      )
    );
    fragment.appendChild(
      createElement(
        "input",
        ["form__input"],
        "visitDesc",
        "Краткое описание",
        true
      )
    );
    // fragment.appendChild(
    //   createElement("p", ["form__text"], "", "", false, "Дата")
    // );
    // let date = createElement("input", ["form__input"], "visitDate", "", true);
    // date.setAttribute("type", "date");
    // fragment.appendChild(date);
    return fragment;
  }

  static findField() {
    let result = {};
    result.name = document.getElementById("name").value;
    result.purposeVisit = document.getElementById("purposeVisit").value;
    result.visitDesc = document.getElementById("visitDesc").value;
    // result.additionalComments = document.getElementById(
    //   "additionalComments"
    // ).value;
    return result;
  }

  createLineAboutYourself() {
    let table = createElement("table", ["table"]);
    table.appendChild(createTrTable(["ФИО", this.name]));
    table.appendChild(createTrTable(["Цель визита", this.purposeVisit]));
    table.appendChild(createTrTable(["Описание", this.visitDesc]));
    return table;
  }

  static randomId() {
    return `f${(+new Date()).toString(16)}`;
  }

  static createSelect() {
    let fragment = document.createDocumentFragment();

    const dialogSelect = createElement("select", ["dialog__doctor"]);
    let dialogSelectDefault = createElement(
      "option",
      [],
      "",
      "",
      false,
      "Выберите Врача"
    );
    dialogSelectDefault.value = "default";
    dialogSelectDefault.setAttribute("selected", "selected");
    dialogSelectDefault.disabled = true;
    // dialogSelectDefault.selected = true;
    dialogSelect.appendChild(dialogSelectDefault);

    const dialogSelectOpt = createElement(
      "option",
      [],
      "",
      "",
      false,
      "Кардиолог"
    );
    dialogSelectOpt.value = "Cardiologist";
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.value = "Dentist";
    dialogSelectOpt.innerText = "Стоматолог";
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
    dialogSelectOpt.value = "Therapist";
    dialogSelectOpt.innerText = "Терапевт";
    dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));

    let containerInputs = createElement("div", ["something"]);

    dialogSelect.addEventListener("change", function () {
      while (containerInputs.firstChild) {
        containerInputs.removeChild(containerInputs.firstChild);
      }

      let form = createElement(
        "form",
        [
          "form",
          "d-flex",
          "flex-column",
          "justify-content-around",
          "mt-1",
          "mb-1",
        ],
        "doctor_form"
      );
      let submit = createElement("input", ["btn", "btn-primary"]);
      submit.setAttribute("type", "submit");
      submit.value = "Create the card";
      if (this.value === "Therapist") {
        form.appendChild(Therapist.createField());
      } else if (this.value === "Cardiologist") {
        form.appendChild(Cardiologist.createField());
      } else if (this.value === "Dentist") {
        form.appendChild(Dentist.createField());
      }

      form.addEventListener("submit", function (event) {
        let selected = dialogSelect.options[dialogSelect.selectedIndex].value;

        let foundInform;
        let id = Visit.randomId();

        if (selected === "Therapist") {
          foundInform = Therapist.findField();
          globalObjectCards[id] = new Therapist(
            foundInform["purposeVisit"],
            foundInform["age"],
            foundInform["name"],
            foundInform["visitDesc"],
            id
          );
        } else if (selected === "Cardiologist") {
          foundInform = Cardiologist.findField();
          globalObjectCards[id] = new Cardiologist(
            foundInform["purposeVisit"],
            foundInform["normalPressure"],
            foundInform["bodyMassIndex"],
            foundInform["pastIllnesses"],
            foundInform["age"],
            foundInform["name"],
            foundInform["visitDesc"],
            id
          );
        } else if (selected === "Dentist") {
          foundInform = Dentist.findField();
          console.log(foundInform);
          console.log(Dentist.findField);
          globalObjectCards[id] = new Dentist(
            foundInform["purposeVisit"],
            foundInform["lastVisit"],
            foundInform["name"],
            foundInform["visitDesc"],
            foundInform["urgency"],
            id
          );
        } else {
          event.preventDefault();
        }
        console.log(board);
        updateLocalStrg("globalObjectCards", globalObjectCards);
        board.appendChild(globalObjectCards[id].renderСard());

        let removeWindow = document.getElementById("dialog");
        removeWindow.remove();

        event.preventDefault();
      });
      form.appendChild(submit);
      containerInputs.appendChild(form);

      // containerInputs.appendChild(submit);
    });

    fragment.appendChild(dialogSelect);
    fragment.appendChild(containerInputs);

    return fragment;
  }

  static restoreCards() {
    let localStorg = localStorage.getItem("globalObjectCards");
    console.log(localStorg);
    if (localStorg !== "{}" || !localStorg) {
      localStorg = JSON.parse(localStorg);
      console.log(localStorg);

      for (let id in localStorg) {
        console.log(localStorg[id]["nameDoctor"]);
        // console.log(localStorg);
        // console.log(id);
        // console.log(localStorg[id]);
        // console.log(localStorg[id]["nameDoctor"]);
        if (localStorg[id]["nameDoctor"] === "Терапевт") {
          globalObjectCards[id] = new Therapist(
            localStorg[id]["purposeVisit"],
            localStorg[id]["age"],
            localStorg[id]["name"],
            localStorg[id]["visitDesc"],
            localStorg[id]["id"]
          );
        } else if (localStorg[id]["nameDoctor"] === "Cardiologist") {
          globalObjectCards[id] = new Cardiologist(
            localStorg[id]["purposeVisit"],
            localStorg[id]["normalPressure"],
            localStorg[id]["bodyMassIndex"],
            localStorg[id]["pastIllnesses"],
            localStorg[id]["age"],
            localStorg[id]["name"],
            localStorg[id]["visitDesc"],
            localStorg[id]["id"]
          );
          console.log(globalObjectCards);
        } else if (localStorg[id]["nameDoctor"] === "Стоматолог") {
          globalObjectCards[id] = new Dentist(
            localStorg[id]["purposeVisit"],
            localStorg[id]["lastVisit"],
            localStorg[id]["name"],
            localStorg[id]["visitDesc"],
            localStorg[id]["urgency"],
            localStorg[id]["id"]
          );
        }
        console.log(globalObjectCards[id]);
        board.appendChild(globalObjectCards[id].renderСard());
      }
    }
  }

  renderСard() {
    if (board.contains(tableEmpty)) {
      tableEmpty.remove();
    }

    let id = this.id;
    console.log(this);
    console.log(id);
    let card = createElement(
      "div",
      [
        "w-25",
        "d-flex",
        "flex-column",
        "align-items-center",
        "border",
        "rounded",
        "border-primary",
        "p-3",
        "bg-light",
        "m-2",
      ],
      id
    );

    // addEventListener("dragstart", function (event) {
    //   dragged = event.target;
    //   dragged.style.position = "absolute";
    //   dragged.style.zIndex = `${heightZIndex++}`;
    //   shiftX = event.pageX - getCoords(dragged).left;
    //   shiftY = event.pageY - getCoords(dragged).top;
    // });

    // card.addEventListener("click", function () {
    //   this.style.zIndex = `${heightZIndex++}`;
    // });

    // if (globalObjectCards[id]["position"]) {
    //   card.style.position = "absolute";
    //   card.style.left = globalObjectCards[id].position.left;
    //   card.style.top = globalObjectCards[id].position.top;
    // }
    console.log(id);
    let buttonClose = createElement("button", [
      "w-75",
      "btn",
      "btn-primary",
      "mb-2",
    ]);
    buttonClose.innerHTML = "Удалить";
    buttonClose.addEventListener("click", function () {
      globalObjectCards[id].removeCardAndObject();
    });
    card.appendChild(buttonClose);

    if (globalObjectCards[id]) {
      card.appendChild(
        createElement(
          "p",
          ["card__item"],
          "",
          "",
          false,
          globalObjectCards[id]["name"]
        )
      );

      card.appendChild(
        createElement(
          "p",
          ["card__item"],
          "",
          "",
          false,
          globalObjectCards[id]["nameDoctor"]
        )
      );
    }
    // else {
    //   throw Error("not found id");
    // }

    let buttonAdditionInf = createElement("button", [
      "card__more",
      "btn",
      "btn-primary",
    ]);
    buttonAdditionInf.innerHTML = "Показать";

    buttonAdditionInf.addEventListener("click", function () {
      document.body.appendChild(
        createWindow(function () {
          console.log(globalObjectCards[id]);
          return globalObjectCards[id].createLineAboutYourself();
        })
      );
    });

    card.appendChild(buttonAdditionInf);
    card.draggable = true;
    return card;
  }

  removeCardAndObject() {
    delete globalObjectCards[this.id];
    updateLocalStrg("globalObjectCards", globalObjectCards);
    document.querySelector(`#${this.id}`).remove();
    if (!globalObjectCards[this.id]) {
      document.body.appendChild(
        createWindow(function () {
          const message = createElement("p", ["dialog__message"]);
          message.innerText = "Deleted successfully";
          return message;
        })
      );
    }
    if (!board.contains(document.querySelector(".card"))) {
      board.appendChild(tableEmpty);
    }
  }
}

class Cardiologist extends Visit {
  constructor(
    // urgency,
    purposeVisit,
    normalPressure,
    bodyMassIndex,
    pastIllnesses,
    age,
    name,
    visitDesc,
    id
  ) {
    super(name, purposeVisit, id);
    this.nameDoctor = "Кардиолог";
    this.age = age;
    this.normalPressure = normalPressure;
    this.bodyMassIndex = bodyMassIndex;
    this.pastIllnesses = pastIllnesses;
    this.visitDesc = visitDesc;
    // this.urgency = urgency;
    this.id = id;
  }

  static createField() {
    let fragment = super.createField();
    let age = createElement("input", ["form__input"], "age", "Возраст", true);
    age.setAttribute("type", "number");
    fragment.appendChild(age);
    fragment.appendChild(
      createElement(
        "input",
        ["form__input"],
        "normalPressure",
        "Давление",
        true
      )
    );
    fragment.appendChild(
      createElement(
        "input",
        ["form__input"],
        "bodyMassIndex",
        "Индекс массы тела",
        true
      )
    );
    fragment.appendChild(
      createElement(
        "input",
        ["form__input"],
        "pastIllnesses",
        "Прошлые болезни",
        true
      )
    );
    // fragment.appendChild(
    //   createElement(
    //     "textarea",
    //     ["form__input", "form__textarea"],
    //     "additionalComments",
    //     "Enter comments"
    //   )
    // );
    return fragment;
  }

  static findField() {
    let result = super.findField();
    result.age = document.getElementById("age").value;
    result.normalPressure = document.getElementById("normalPressure").value;
    result.bodyMassIndex = document.getElementById("bodyMassIndex").value;
    result.pastIllnesses = document.getElementById("pastIllnesses").value;
    return result;
  }

  createLineAboutYourself() {
    let table = super.createLineAboutYourself();
    table.appendChild(createTrTable(["Возраст", this.age]));
    table.appendChild(createTrTable(["Врач", this.nameDoctor]));
    table.appendChild(createTrTable(["Давление", this.normalPressure]));
    table.appendChild(createTrTable(["ИМТ", this.bodyMassIndex]));
    table.appendChild(createTrTable(["Прошлые болезни", this.pastIllnesses]));

    return table;
  }
}

class Dentist extends Visit {
  constructor(purposeVisit, lastVisit, name, visitDesc, urgency, id) {
    super(name, purposeVisit, visitDesc, id);
    this.lastVisit = lastVisit;
    this.nameDoctor = "Стоматолог";
    this.urgency = urgency;
    this.id = id;
  }

  static createField() {
    let fragment = super.createField();
    fragment.appendChild(
      createElement(
        "input",
        ["form__input"],
        "lastVisit",
        "Дата последнего визита",
        true
      )
    );

    function createSelect() {
      const dialogSelect = createElement("select", ["form__input"], "urgency");
      let dialogSelectDefault = createElement(
        "option",
        [],
        "",
        "",
        false,
        "Укажите срочность"
      );
      dialogSelectDefault.value = "default";
      dialogSelectDefault.setAttribute("selected", "selected");
      // dialogSelectDefault.disabled = true;
      // dialogSelectDefault.selected = true;
      dialogSelect.appendChild(dialogSelectDefault);

      const dialogSelectOpt = createElement(
        "option",
        [],
        "",
        "",
        false,
        "Обычная"
      );
      dialogSelectOpt.value = "Normal";
      dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
      dialogSelectOpt.value = "High";
      dialogSelectOpt.innerText = "Высокая";
      dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
      dialogSelectOpt.value = "Super Urgent";
      dialogSelectOpt.innerText = "очень высокая";
      dialogSelect.appendChild(dialogSelectOpt.cloneNode(true));
      fragment.appendChild(dialogSelect);
    }
    createSelect();

    return fragment;
  }

  static findField() {
    let result = super.findField();
    result.lastVisit = document.getElementById("lastVisit").value;
    result.urgency = document.getElementById("urgency").value;
    return result;
  }

  createLineAboutYourself() {
    let table = super.createLineAboutYourself();
    table.appendChild(createTrTable(["Врач", this.nameDoctor]));
    table.appendChild(createTrTable(["Last visit", this.lastVisit]));

    return table;
  }
}

class Therapist extends Visit {
  constructor(purposeVisit, age, name, visitDesc, id) {
    super(name, purposeVisit, visitDesc, id);
    this.age = age;
    this.nameDoctor = "Терапевт";
    this.id = id;
    // this.urgency = "";
  }

  static createField() {
    let fragment = super.createField();
    let age = createElement("input", ["form__input"], "age", "Возраст", true);
    age.setAttribute("type", "number");
    fragment.appendChild(age);
    // fragment.appendChild(
    //   createElement(
    //     "textarea",
    //     ["form__input", "form__textarea"],
    //     "additionalComments",
    //     "Enter comments"
    //   )
    // );
    return fragment;
  }

  static findField() {
    let result = super.findField();
    result.age = document.getElementById("age").value;
    return result;
  }

  createLineAboutYourself() {
    let table = super.createLineAboutYourself();
    table.appendChild(createTrTable(["Doctor", this.nameDoctor]));
    table.appendChild(createTrTable(["Age", this.age]));
    table.appendChild(
      createTrTable([
        "Comments",
        this.additionalComments ? this.additionalComments : "No comments",
      ])
    );
    return table;
  }
}
