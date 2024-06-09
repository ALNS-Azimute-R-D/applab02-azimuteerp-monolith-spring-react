import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IPaymentGateway {
  id?: number;
  aliasCode?: string;
  description?: string;
  businessHandlerClazz?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
}

export const defaultValue: Readonly<IPaymentGateway> = {};
