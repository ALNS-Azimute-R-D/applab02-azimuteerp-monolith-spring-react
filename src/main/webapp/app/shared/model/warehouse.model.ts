import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IWarehouse {
  id?: number;
  acronym?: string;
  name?: string;
  description?: string | null;
  streetAddress?: string;
  houseNumber?: string | null;
  locationName?: string | null;
  postalCode?: string;
  pointLocationContentType?: string | null;
  pointLocation?: string | null;
  mainEmail?: string | null;
  landPhoneNumber?: string | null;
  mobilePhoneNumber?: string | null;
  faxNumber?: string | null;
  customAttributesDetailsJSON?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
}

export const defaultValue: Readonly<IWarehouse> = {};
