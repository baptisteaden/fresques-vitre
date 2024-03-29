import capitalize from "./capitalize";

const dateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  timeStyle: "short",
});

export default function formatTime(date: string | Date) {
  if (!date) return null;

  const fDate = dateTimeFormat.format(new Date(date));

  return capitalize(fDate);
}
