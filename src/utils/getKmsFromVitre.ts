import type { Workshop } from "../types";

const VITRE_COORDS = {
  lat: 48.124591025333295,
  lng: -1.21439201938383,
};

const hasCoords = (workshop: Workshop) =>
  "latitude" in workshop &&
  "longitude" in workshop &&
  !["", null, undefined].includes(workshop.latitude) &&
  !["", null, undefined].includes(workshop.longitude);

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default function getKmsFromVitre(workshop: Workshop) {
  if (!hasCoords(workshop)) return null;

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(Number(workshop.latitude) - VITRE_COORDS.lat); // deg2rad below
  const dLon = deg2rad(Number(workshop.longitude) - VITRE_COORDS.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(VITRE_COORDS.lat)) *
      Math.cos(deg2rad(Number(workshop.latitude))) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const kilometers = R * c; // Distance in km
  return kilometers;
}
