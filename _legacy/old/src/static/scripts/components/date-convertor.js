window.App.DateConvertor = (function() {
  "use strict";

  const config = {
    attribute: "data-date-convert"
  };

  function init() {
    const elements = document.querySelectorAll(`[${config.attribute}]`);
    elements.forEach(el => {
      const date = el.getAttribute("datetime");
      if (!date) return;

      el.innerHTML = dateHowLongBefore(date);
    });
  }

  function dateHowLongBefore(date) {
    date = new Date(date);
    const nowTimestamp = Date.now();
    const dateTimestamp = date.getTime();

    const seconds = Math.round((nowTimestamp - dateTimestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / (60 * 60));
    const days = Math.floor(seconds / (60 * 60 * 24));
    const months = Math.floor(seconds / (60 * 60 * 24 * 30));
    const years = Math.floor(seconds / (60 * 60 * 24 * 30 * 12));

    const plural = (word, count) => `${word}${count === 1 ? "" : "s"}`;

    if (minutes <= 10) {
      return "just now";
    } else if (minutes <= 60) {
      return `${minutes} ${plural("minute", minutes)} ago`;
    } else if (hours <= 6) {
      return `${hours} ${plural("hour", minutes)} ago`;
    } else if (hours <= 24) {
      return "today";
    } else if (days <= 30) {
      return `${days} ${plural("day", days)} ago`;
    } else if (months <= 12) {
      return `${months} ${plural("month", months)} ago`;
    } else {
      return `${years} ${plural("year", years)} ago`;
    }
  }

  return {
    init
  };
})();
