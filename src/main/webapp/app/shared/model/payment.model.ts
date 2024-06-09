import dayjs from 'dayjs';
import { IPaymentGateway } from 'app/shared/model/payment-gateway.model';
import { PaymentTypeEnum } from 'app/shared/model/enumerations/payment-type-enum.model';
import { PaymentStatusEnum } from 'app/shared/model/enumerations/payment-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IPayment {
  id?: number;
  installmentNumber?: number;
  paymentDueDate?: dayjs.Dayjs;
  paymentPaidDate?: dayjs.Dayjs;
  paymentAmount?: number;
  typeOfPayment?: keyof typeof PaymentTypeEnum;
  statusPayment?: keyof typeof PaymentStatusEnum;
  customAttributesDetailsJSON?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  paymentGateway?: IPaymentGateway;
}

export const defaultValue: Readonly<IPayment> = {};
