import dayjs from 'dayjs';
import { IInvoice } from 'app/shared/model/invoice.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { OrderStatusEnum } from 'app/shared/model/enumerations/order-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IOrder {
  id?: number;
  businessCode?: string;
  placedDate?: dayjs.Dayjs;
  totalTaxValue?: number | null;
  totalDueValue?: number | null;
  status?: keyof typeof OrderStatusEnum;
  estimatedDeliveryDate?: dayjs.Dayjs | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  invoice?: IInvoice | null;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IOrder> = {};
