import dayjs from 'dayjs';
import { IPaymentGateway } from 'app/shared/model/payment-gateway.model';
import { InvoiceStatusEnum } from 'app/shared/model/enumerations/invoice-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IInvoice {
  id?: number;
  businessCode?: string;
  invoiceDate?: dayjs.Dayjs | null;
  dueDate?: dayjs.Dayjs | null;
  description?: string;
  taxValue?: number | null;
  shippingValue?: number | null;
  amountDueValue?: number | null;
  numberOfInstallmentsOriginal?: number;
  numberOfInstallmentsPaid?: number | null;
  amountPaidValue?: number | null;
  status?: keyof typeof InvoiceStatusEnum;
  customAttributesDetailsJSON?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  preferrablePaymentGateway?: IPaymentGateway | null;
}

export const defaultValue: Readonly<IInvoice> = {};
