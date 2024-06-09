import { IBrand } from 'app/shared/model/brand.model';
import { ISupplier } from 'app/shared/model/supplier.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IProduct {
  id?: number;
  productSKU?: string | null;
  productName?: string | null;
  description?: string | null;
  standardCost?: number | null;
  listPrice?: number;
  reorderLevel?: number | null;
  targetLevel?: number | null;
  quantityPerUnit?: string | null;
  discontinued?: boolean;
  minimumReorderQuantity?: number | null;
  suggestedCategory?: string | null;
  attachmentsContentType?: string | null;
  attachments?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  brand?: IBrand;
  toSuppliers?: ISupplier[] | null;
}

export const defaultValue: Readonly<IProduct> = {
  discontinued: false,
};
