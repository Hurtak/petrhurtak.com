export function utc(timestamp: number): string {
  // GMT string example "Mon, 27 Jun 2016 17:48:24 GMT"
  const date = new Date(timestamp);
  return date.toUTCString();
}

export function iso(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toISOString();
}

export function fullDate(timestamp: number): string {
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

function plural(word: string, count: number): string {
  return `${word}${count === 1 ? "" : "s"}`;
}

export function howLongBefore(timestamp: number): string {
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
