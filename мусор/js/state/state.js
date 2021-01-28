const subscribers = {};

export const state = {};

export const subscribe = ({event = "", callback}) => {
  if(!subscribers[event]){
    subscribers[event] = [];
  }
  subscribers[event].push(callback);
}
export const publish = ({event = "", data = {}}) => {
  if(!subscribers[event]) {
    return;
  } else {
    subscribers[event].forEach(subscriberCallback => {
      subscriberCallback(data);
    })
  }
}
