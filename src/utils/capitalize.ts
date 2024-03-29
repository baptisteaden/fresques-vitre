export default function capitalize(str: string, forceLower = false) {
  if (!str) return str;

  return (
    str.charAt(0).toUpperCase() +
    (forceLower ? str.slice(1).toLowerCase() : str.slice(1))
  );
}
