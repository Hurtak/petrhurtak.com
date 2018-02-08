export function gmt(date) {
  // GMT string example "Mon, 27 Jun 2016 17:48:24 GMT"
  return date.toGMTString();
}

export function fullDate(timestamp) {
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

  const date = new Date(timestamp);

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const dayPostfix = (() => {
    if (day >= 4 && day <= 20) {
      return "th";
    }

    const lastDigitInDay = date.getUTCDate() % 10;
    switch (lastDigitInDay) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  })();

  return `${day}${dayPostfix} ${month} ${year}`;
}

export function dateTimeAttribute(timestamp) {
  // 0. timestamp -> 1466262512000
  // 1. date -> "Sat Jun 18 2016 17:08:32 GMT+0200 (Central Europe Daylight Time)"
  // 2. toISOString() -> "2016-06-18T15:08:32.598Z"
  // 3. substr(0,19) -> "2016-06-18T15:08:32"

  const date = new Date(timestamp);
  return date.toISOString().substr(0, 19);
}

function plural(word, count) {
  return `${word}${count === 1 ? "" : "s"}`;
}

export function howLongBefore(timestamp) {
  const date = new Date(timestamp);

  const nowTimestamp = Date.now();
  const dateTimestamp = date.getTime();

  const seconds = Math.round((nowTimestamp - dateTimestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / (60 * 60));
  const days = Math.floor(seconds / (60 * 60 * 24));
  const months = Math.floor(seconds / (60 * 60 * 24 * 30));
  const years = Math.floor(seconds / (60 * 60 * 24 * 30 * 12));

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
