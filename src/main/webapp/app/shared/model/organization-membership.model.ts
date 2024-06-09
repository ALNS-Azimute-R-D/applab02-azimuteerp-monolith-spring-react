import dayjs from 'dayjs';
import { IOrganization } from 'app/shared/model/organization.model';
import { IPerson } from 'app/shared/model/person.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IOrganizationMembership {
  id?: number;
  joinedAt?: dayjs.Dayjs;
  activationStatus?: keyof typeof ActivationStatusEnum;
  organization?: IOrganization;
  person?: IPerson;
}

export const defaultValue: Readonly<IOrganizationMembership> = {};
