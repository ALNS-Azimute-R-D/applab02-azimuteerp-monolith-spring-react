import { IOrganization } from 'app/shared/model/organization.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IOrganizationRole {
  id?: number;
  roleName?: string;
  activationStatus?: keyof typeof ActivationStatusEnum;
  organization?: IOrganization;
}

export const defaultValue: Readonly<IOrganizationRole> = {};
