import dayjs from 'dayjs';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IStockLevel {
  id?: number;
  lastModifiedDate?: dayjs.Dayjs;
  remainingQuantity?: number;
  commonAttributesDetailsJSON?: string | null;
  warehouse?: IWarehouse;
  product?: IProduct;
}

export const defaultValue: Readonly<IStockLevel> = {};
