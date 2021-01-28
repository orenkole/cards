import { url } from "./constants.js";

export const sendLoginRequest = async function sendLogin(requestObj) {
  let response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestObj)
    });
    let result = await response.text();
    return result;
}
