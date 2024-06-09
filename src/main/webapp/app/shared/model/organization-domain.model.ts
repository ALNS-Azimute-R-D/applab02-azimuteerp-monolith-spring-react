import { IOrganization } from 'app/shared/model/organization.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IOrganizationDomain {
  id?: number;
  domainAcronym?: string;
  name?: string;
  isVerified?: boolean;
  businessHandlerClazz?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  organization?: IOrganization;
}

export const defaultValue: Readonly<IOrganizationDomain> = {
  isVerified: false,
};
