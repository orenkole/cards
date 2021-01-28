import {state, publish} from "../state/state.js";
import Form from "../classes/Form.js";
import Input from "../classes/Input.js";
import {sendLoginRequest} from "../queries/sendLoginRequest.js";
import {signUpBtnObj, signUpBtnElement} from "./signUpBtnObj.js";

// render sign up form
export const signUpFormObj = new Form();
export const signUpFormElement = signUpFormObj.element;

const InputEmailObj = new Input({
  placeholder: "email",
  name: "email",
  type: "email",
  value: ""
});
InputEmailObj.render(signUpFormElement, "beforeend")
const InputEmailElement = InputEmailObj.element;

const InputPasswordObj = new Input({
  placeholder: "password",
  name: "password",
  type: "password",
  value: ""
});
InputPasswordObj.render(signUpFormElement, "beforeend");
const InputPasswordElement = InputPasswordObj.element;

const InputSubmitObj = new Input({
  type: "submit",
  value: "Login"
});
const InputSubmitElement = InputSubmitObj.element;
InputSubmitObj.render(signUpFormElement, "beforeend");

signUpFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const tokenPromise = sendLoginRequest({
    email: InputEmailElement.value,
    password: InputPasswordElement.value
  });
  tokenPromise
    .then(onLogin)
})

const onLogin = token => {
  if(token === "Incorrect username or password") {
    state.token = false;
  } else {
    state.token = token;
    publish({event: "loggedIn"});
    InputEmailElement.value = "";
    InputPasswordElement.value = "";
  }
}
