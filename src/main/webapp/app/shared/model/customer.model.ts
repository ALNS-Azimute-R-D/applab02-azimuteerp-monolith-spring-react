import { IPerson } from 'app/shared/model/person.model';
import { ICustomerType } from 'app/shared/model/customer-type.model';
import { IDistrict } from 'app/shared/model/district.model';
import { CustomerStatusEnum } from 'app/shared/model/enumerations/customer-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface ICustomer {
  id?: number;
  customerBusinessCode?: string;
  fullname?: string;
  customAttributesDetailsJSON?: string | null;
  customerStatus?: keyof typeof CustomerStatusEnum;
  activationStatus?: keyof typeof ActivationStatusEnum;
  buyerPerson?: IPerson;
  customerType?: ICustomerType | null;
  district?: IDistrict | null;
}

export const defaultValue: Readonly<ICustomer> = {};
