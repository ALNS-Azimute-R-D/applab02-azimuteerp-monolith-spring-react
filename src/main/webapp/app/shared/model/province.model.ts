import { ICountry } from 'app/shared/model/country.model';

export interface IProvince {
  id?: number;
  acronym?: string;
  name?: string;
  geoPolygonAreaContentType?: string | null;
  geoPolygonArea?: string | null;
  country?: ICountry;
}

export const defaultValue: Readonly<IProvince> = {};
