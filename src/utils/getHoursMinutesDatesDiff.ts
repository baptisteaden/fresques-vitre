export default function getHoursMinutesDatesDiff(date1: string, date2: string) {
  if (!date1 || !date2) return null;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const msDiff = d2.getTime() - d1.getTime();

  let hours = msDiff / 1000 / 60 / 60;

  const minutes = (hours % 1) * 60;

  hours = Math.trunc(hours);

  let durationStr = "";
  if (hours > 0) durationStr += `${hours}h`;
  if (minutes > 0) durationStr += minutes;
  if (hours <= 0 && minutes > 0) durationStr += "min";

  return durationStr;
}
