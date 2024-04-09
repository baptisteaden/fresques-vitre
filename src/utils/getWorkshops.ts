import type { Workshop } from "../types";
import getHoursMinutesDatesDiff from "./getHoursMinutesDatesDiff";
import getKmsFromVitre from "./getKmsFromVitre";
import { workshopTypesById } from "./workshopTypes";

export default async function getWorkshops() {
  const data: Workshop[] = await fetch(
    "https://marbeuf.ddns.net/trouverunefresque"
  ).then((r) => r.json());

  const workshops = data
    .map((w) => {
      return {
        ...w,
        date: new Date(w.start_date),
        duration: getHoursMinutesDatesDiff(w.start_date, w.end_date),
        kmsFromVitre: getKmsFromVitre(w),
        workshopTypeDets: workshopTypesById[w.workshop_type],
      };
    })
    .filter((w) => w.kmsFromVitre != null && w.kmsFromVitre < 15)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return { lastUpdate: data[0].scrape_date, workshops };
}
