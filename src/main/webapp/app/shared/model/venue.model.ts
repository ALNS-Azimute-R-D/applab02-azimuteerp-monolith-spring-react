import { ITypeOfVenue } from 'app/shared/model/type-of-venue.model';
import { ICommonLocality } from 'app/shared/model/common-locality.model';

export interface IVenue {
  id?: number;
  acronym?: string | null;
  name?: string;
  description?: string | null;
  geoPointLocationContentType?: string | null;
  geoPointLocation?: string | null;
  typeOfVenue?: ITypeOfVenue;
  commonLocality?: ICommonLocality | null;
}

export const defaultValue: Readonly<IVenue> = {};
