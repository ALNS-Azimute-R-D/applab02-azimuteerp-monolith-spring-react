import { IOrganization } from 'app/shared/model/organization.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IBusinessUnit {
  id?: number;
  acronym?: string;
  hierarchicalLevel?: string | null;
  name?: string;
  activationStatus?: keyof typeof ActivationStatusEnum;
  organization?: IOrganization;
  businessUnitParent?: IBusinessUnit | null;
}

export const defaultValue: Readonly<IBusinessUnit> = {};
