import { IOrganization } from 'app/shared/model/organization.model';

export interface IOrganizationAttribute {
  id?: number;
  attributeName?: string | null;
  attributeValue?: string | null;
  organization?: IOrganization;
}

export const defaultValue: Readonly<IOrganizationAttribute> = {};
