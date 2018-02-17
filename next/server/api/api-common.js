export function articleMetadataDateToTimestamp(dateString) {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes, seconds] = time.split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
}
