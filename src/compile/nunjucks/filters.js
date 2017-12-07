"use strict";

const lodash = require("lodash");

function datetimeAttribute(date) {
  // 1. date -> "Sat Jun 18 2016 17:08:32 GMT+0200 (Central Europe Daylight Time)"
  // 2. toISOString() -> "2016-06-18T15:08:32.598Z"
  // 3. substr(0,19) -> "2016-06-18T15:08:32"
  return date.toISOString().substr(0, 19);
}

function gmt(date) {
  // GMT string example "Mon, 27 Jun 2016 17:48:24 GMT"
  return date.toGMTString();
}

function fullDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const lastDigitInDay = date.getUTCDate() % 10;
  let dayPostfix;
  switch (lastDigitInDay) {
    case 1:
      dayPostfix = "st";
      break;
    case 2:
      dayPostfix = "nd";
      break;
    case 3:
      dayPostfix = "rd";
      break;
    default:
      dayPostfix = "th";
      break;
  }
  if (day >= 4 && day <= 20) {
    dayPostfix = "th";
  }

  return `${day}${dayPostfix} ${month} ${year}`;
}

function sortBy(data, sortBy) {
  return lodash.sortBy(data, sortBy);
}

function limit(data, limitTo) {
  if (typeof data === "string") {
    if (limitTo >= 0) {
      return data.substring(0, limitTo);
    } else {
      return data.substr(limitTo);
    }
  } else if (Array.isArray(data)) {
    if (limitTo >= 0) {
      return data.slice(0, limitTo);
    } else {
      return data.slice(limitTo);
    }
  }

  return data;
}

module.exports = {
  datetimeAttribute,
  gmt,
  fullDate,
  sortBy,
  limit
};
