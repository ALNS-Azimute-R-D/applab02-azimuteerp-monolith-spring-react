import { IProvince } from 'app/shared/model/province.model';

export interface ITownCity {
  id?: number;
  acronym?: string;
  name?: string;
  geoPolygonAreaContentType?: string | null;
  geoPolygonArea?: string | null;
  province?: IProvince;
}

export const defaultValue: Readonly<ITownCity> = {};
