import { token, url } from "./constants.js";

export const sendCreateVisitRequest = async function sendNewVisit(requestObj) {
  let response = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestObj)
    });
    let result = await response.text();
    return result;
}
