import capitalize from "./capitalize";

const dateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/Paris",
});

export default function formatDateTime(date: string | Date) {
  if (!date) return null;

  const fDate = dateTimeFormat.format(new Date(date));

  return capitalize(fDate);
}
