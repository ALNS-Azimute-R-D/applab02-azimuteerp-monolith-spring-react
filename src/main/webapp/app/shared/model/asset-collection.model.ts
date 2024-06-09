import { IAsset } from 'app/shared/model/asset.model';
import { IArticle } from 'app/shared/model/article.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IAssetCollection {
  id?: number;
  name?: string;
  fullFilenamePath?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  assets?: IAsset[] | null;
  articles?: IArticle[] | null;
}

export const defaultValue: Readonly<IAssetCollection> = {};
