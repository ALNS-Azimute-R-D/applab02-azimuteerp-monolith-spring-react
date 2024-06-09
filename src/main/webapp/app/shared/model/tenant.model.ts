import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface ITenant {
  id?: number;
  acronym?: string;
  name?: string;
  description?: string;
  customerBusinessCode?: string;
  businessHandlerClazz?: string | null;
  mainContactPersonDetailsJSON?: string | null;
  billingDetailsJSON?: string | null;
  technicalEnvironmentsDetailsJSON?: string | null;
  customAttributesDetailsJSON?: string | null;
  logoImgContentType?: string | null;
  logoImg?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
}

export const defaultValue: Readonly<ITenant> = {};
