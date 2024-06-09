import dayjs from 'dayjs';
import { ISupplier } from 'app/shared/model/supplier.model';
import { IProduct } from 'app/shared/model/product.model';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IInventoryTransaction {
  id?: number;
  invoiceId?: number;
  transactionCreatedDate?: dayjs.Dayjs | null;
  transactionModifiedDate?: dayjs.Dayjs | null;
  quantity?: number;
  transactionComments?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  supplier?: ISupplier;
  product?: IProduct;
  warehouse?: IWarehouse;
}

export const defaultValue: Readonly<IInventoryTransaction> = {};
