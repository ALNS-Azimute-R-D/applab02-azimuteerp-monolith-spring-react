import dayjs from 'dayjs';
import { IOrganizationMembership } from 'app/shared/model/organization-membership.model';
import { IOrganizationRole } from 'app/shared/model/organization-role.model';

export interface IOrganizationMemberRole {
  id?: number;
  joinedAt?: dayjs.Dayjs;
  organizationMembership?: IOrganizationMembership;
  organizationRole?: IOrganizationRole;
}

export const defaultValue: Readonly<IOrganizationMemberRole> = {};
