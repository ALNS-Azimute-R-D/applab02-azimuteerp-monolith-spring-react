import { IDistrict } from 'app/shared/model/district.model';

export interface ICommonLocality {
  id?: number;
  acronym?: string;
  name?: string;
  description?: string | null;
  streetAddress?: string;
  houseNumber?: string | null;
  locationName?: string | null;
  postalCode?: string;
  geoPolygonAreaContentType?: string | null;
  geoPolygonArea?: string | null;
  district?: IDistrict;
}

export const defaultValue: Readonly<ICommonLocality> = {};
