export interface CityTz {
  id: string;
  label: string;
  timezone: string;
}

export const CITIES: CityTz[] = [
  { id: "sf", label: "San Francisco", timezone: "America/Los_Angeles" },
  { id: "la", label: "Los Angeles", timezone: "America/Los_Angeles" },
  { id: "ny", label: "New York", timezone: "America/New_York" },
  { id: "chi", label: "Chicago", timezone: "America/Chicago" },
  { id: "tor", label: "Toronto", timezone: "America/Toronto" },
  { id: "van", label: "Vancouver", timezone: "America/Vancouver" },
  { id: "mex", label: "Mexico City", timezone: "America/Mexico_City" },
  { id: "sao", label: "São Paulo", timezone: "America/Sao_Paulo" },
  { id: "lon", label: "London", timezone: "Europe/London" },
  { id: "par", label: "Paris", timezone: "Europe/Paris" },
  { id: "ber", label: "Berlin", timezone: "Europe/Berlin" },
  { id: "ams", label: "Amsterdam", timezone: "Europe/Amsterdam" },
  { id: "mad", label: "Madrid", timezone: "Europe/Madrid" },
  { id: "zur", label: "Zurich", timezone: "Europe/Zurich" },
  { id: "sto", label: "Stockholm", timezone: "Europe/Stockholm" },
  { id: "ist", label: "Istanbul", timezone: "Europe/Istanbul" },
  { id: "mos", label: "Moscow", timezone: "Europe/Moscow" },
  { id: "cai", label: "Cairo", timezone: "Africa/Cairo" },
  { id: "cpt", label: "Cape Town", timezone: "Africa/Johannesburg" },
  { id: "dub", label: "Dubai", timezone: "Asia/Dubai" },
  { id: "mum", label: "Mumbai", timezone: "Asia/Kolkata" },
  { id: "blr", label: "Bangalore", timezone: "Asia/Kolkata" },
  { id: "bkk", label: "Bangkok", timezone: "Asia/Bangkok" },
  { id: "sgp", label: "Singapore", timezone: "Asia/Singapore" },
  { id: "jkt", label: "Jakarta", timezone: "Asia/Jakarta" },
  { id: "bei", label: "Beijing", timezone: "Asia/Shanghai" },
  { id: "sha", label: "Shanghai", timezone: "Asia/Shanghai" },
  { id: "hkg", label: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { id: "twn", label: "Taipei", timezone: "Asia/Taipei" },
  { id: "sel", label: "Seoul", timezone: "Asia/Seoul" },
  { id: "tyo", label: "Tokyo", timezone: "Asia/Tokyo" },
  { id: "syd", label: "Sydney", timezone: "Australia/Sydney" },
  { id: "akl", label: "Auckland", timezone: "Pacific/Auckland" },
];

export const DEFAULT_CITIES = ["sf", "ny", "lon", "tyo"];

export function getCity(id: string): CityTz | undefined {
  return CITIES.find(c => c.id === id);
}

export function formatCityTime(timezone: string, now: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}
