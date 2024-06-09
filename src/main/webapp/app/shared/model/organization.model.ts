import { ITenant } from 'app/shared/model/tenant.model';
import { ITypeOfOrganization } from 'app/shared/model/type-of-organization.model';
import { OrganizationStatusEnum } from 'app/shared/model/enumerations/organization-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IOrganization {
  id?: number;
  acronym?: string;
  businessCode?: string;
  hierarchicalLevel?: string | null;
  name?: string;
  description?: string;
  businessHandlerClazz?: string | null;
  mainContactPersonDetailsJSON?: string | null;
  technicalEnvironmentsDetailsJSON?: string | null;
  customAttributesDetailsJSON?: string | null;
  organizationStatus?: keyof typeof OrganizationStatusEnum;
  activationStatus?: keyof typeof ActivationStatusEnum;
  logoImgContentType?: string | null;
  logoImg?: string | null;
  tenant?: ITenant;
  typeOfOrganization?: ITypeOfOrganization;
  organizationParent?: IOrganization | null;
}

export const defaultValue: Readonly<IOrganization> = {};
