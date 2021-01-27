function createAnalytics() {
  let counter = 0;
  let destriyed = false;

  const listener = () => counter++;

  document.addEventListener("click", listener);

  return {
    destroy() {
      document.removeEventListener("click", listener);
      destriyed = true;
    },
    getClicks() {
      if (destriyed) {
        return `Analytics is destroyed. Total clicks = ${counter}`;
      }
      return counter;
    },
  };
}

window.analytics = createAnalytics();
