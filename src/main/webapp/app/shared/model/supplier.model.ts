import { IPerson } from 'app/shared/model/person.model';
import { IProduct } from 'app/shared/model/product.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface ISupplier {
  id?: number;
  acronym?: string;
  companyName?: string;
  streetAddress?: string;
  houseNumber?: string | null;
  locationName?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  zipPostalCode?: string | null;
  countryRegion?: string | null;
  pointLocationContentType?: string | null;
  pointLocation?: string | null;
  mainEmail?: string | null;
  phoneNumber1?: string | null;
  phoneNumber2?: string | null;
  customAttributesDetailsJSON?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  representativePerson?: IPerson;
  toProducts?: IProduct[] | null;
}

export const defaultValue: Readonly<ISupplier> = {};
