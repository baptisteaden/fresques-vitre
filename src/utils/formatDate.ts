import capitalize from "./capitalize";

const dateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
});

export default function formatDate(date: string | Date) {
  if (!date) return null;

  const fDate = dateTimeFormat.format(new Date(date));

  return capitalize(fDate);
}
