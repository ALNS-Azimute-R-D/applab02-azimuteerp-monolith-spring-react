import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { ICategory } from 'app/shared/model/category.model';
import { SizeOptionEnum } from 'app/shared/model/enumerations/size-option-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IArticle {
  id?: number;
  inventoryProductId?: number;
  skuCode?: string | null;
  customName?: string | null;
  customDescription?: string | null;
  priceValue?: number | null;
  itemSize?: keyof typeof SizeOptionEnum;
  activationStatus?: keyof typeof ActivationStatusEnum;
  assetCollections?: IAssetCollection[] | null;
  mainCategory?: ICategory | null;
}

export const defaultValue: Readonly<IArticle> = {};
