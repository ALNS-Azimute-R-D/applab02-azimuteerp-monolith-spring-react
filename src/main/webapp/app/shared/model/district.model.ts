import { ITownCity } from 'app/shared/model/town-city.model';

export interface IDistrict {
  id?: number;
  acronym?: string;
  name?: string;
  geoPolygonAreaContentType?: string | null;
  geoPolygonArea?: string | null;
  townCity?: ITownCity;
}

export const defaultValue: Readonly<IDistrict> = {};
