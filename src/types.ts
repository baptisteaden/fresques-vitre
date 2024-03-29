export type Workshop = {
  address: string;
  city: string;
  department: string;
  end_date: string;
  full_location: string;
  kids: boolean;
  latitude: string;
  location_name: string;
  longitude: string;
  online: boolean;
  scrape_date: string;
  sold_out: boolean;
  source_link: string;
  start_date: string;
  title: string;
  training: boolean;
  workshop_type: number;
  zip_code: string;
};

export type WorkshopType = {
  id: number;
  code: string;
  logo: string;
  name: string;
  promoted: boolean;
  website: string;
  styleCode: string;
};
