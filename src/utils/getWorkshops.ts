import type { Workshop } from "../types";
import getHoursMinutesDatesDiff from "./getHoursMinutesDatesDiff";
import getKmsFromVitre from "./getKmsFromVitre";
import { workshopTypesById } from "./workshopTypes";

// TODO: remove when trouverunefresque issue fixed...
// https://github.com/trouver-une-fresque/trouver-une-fresque/issues/34
const tmpHardcodedEvents = [
  {
    workshop_type: 100,
    title: "2tonnes - Atelier à VITRE (35500)",
    online: false,
    training: false,
    sold_out: false,
    kids: false,
    start_date: "2024-05-17T16:30:00+00:00",
    end_date: "2024-05-17T19:30:00+00:00",
    zip_code: "35500",
    latitude: "48.12486136506943",
    longitude: "-1.2113322742758648",
    source_link:
      "https://www.eventbrite.com/e/billets-2tonnes-atelier-a-vitre-35500-875921142717?aff=odcleoeventsincollection&keep_tld=1",
    department: "35",
    city: "Vitré",
    address: "27 Rue Notre Dame",
    location_name: "Centre Social de Vitré",
    full_location:
      "Centre Social de Vitré, 27 Rue Notre Dame, 35500 Vitré, France",
    scrape_date: "2024-04-07T09:52:12.911225+00:00",
  },

  {
    workshop_type: 200,
    title: "Atelier La Fresque du Climat",
    online: false,
    training: false,
    sold_out: false,
    kids: false,
    start_date: "2024-05-03T12:30:00+00:00",
    end_date: "2024-05-03T15:30:00+00:00",
    zip_code: "35500",
    latitude: "48.12486136506943",
    longitude: "-1.2113322742758648",
    source_link:
      "https://association.climatefresk.org/training_sessions/e557a515-449a-4dc2-9343-f37b90e672a0/show_public?language=fr&tenant_token=36bd2274d3982262c0021755",
    department: "35",
    city: "Vitré",
    address: "27 Rue Notre Dame",
    location_name: "Centre Social de Vitré",
    full_location:
      "Centre Social de Vitré, 27 Rue Notre Dame, 35500 Vitré, France",
    scrape_date: "2024-04-07T09:52:12.911225+00:00",
  },
  {
    workshop_type: 200,
    title: "Atelier La Fresque du Climat",
    online: false,
    training: false,
    sold_out: false,
    kids: false,
    start_date: "2024-05-31T12:30:00+00:00",
    end_date: "2024-05-31T15:30:00+00:00",
    zip_code: "35500",
    latitude: "48.12486136506943",
    longitude: "-1.2113322742758648",
    source_link:
      "https://association.climatefresk.org/training_sessions/045a4cbd-781e-4ed3-a044-eacce49301ab/show_public?language=fr&tenant_token=36bd2274d3982262c0021755",
    department: "35",
    city: "Vitré",
    address: "27 Rue Notre Dame",
    location_name: "Centre Social de Vitré",
    full_location:
      "Centre Social de Vitré, 27 Rue Notre Dame, 35500 Vitré, France",
    scrape_date: "2024-04-07T09:52:12.911225+00:00",
  },
];

export default async function getWorkshops() {
  const data: Workshop[] = await fetch(
    "https://marbeuf.ddns.net/trouverunefresque"
  ).then((r) => r.json());

  const workshops = data
    .concat(tmpHardcodedEvents)
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
