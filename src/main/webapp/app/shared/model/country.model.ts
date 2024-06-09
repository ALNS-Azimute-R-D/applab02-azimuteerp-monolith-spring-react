import { ContinentEnum } from 'app/shared/model/enumerations/continent-enum.model';

export interface ICountry {
  id?: number;
  acronym?: string;
  name?: string;
  continent?: keyof typeof ContinentEnum;
  geoPolygonAreaContentType?: string | null;
  geoPolygonArea?: string | null;
}

export const defaultValue: Readonly<ICountry> = {};
