import { IAssetType } from 'app/shared/model/asset-type.model';
import { IRawAssetProcTmp } from 'app/shared/model/raw-asset-proc-tmp.model';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { StorageTypeEnum } from 'app/shared/model/enumerations/storage-type-enum.model';
import { StatusAssetEnum } from 'app/shared/model/enumerations/status-asset-enum.model';
import { PreferredPurposeEnum } from 'app/shared/model/enumerations/preferred-purpose-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IAsset {
  id?: number;
  name?: string;
  storageTypeUsed?: keyof typeof StorageTypeEnum | null;
  fullFilenamePath?: string | null;
  status?: keyof typeof StatusAssetEnum | null;
  preferredPurpose?: keyof typeof PreferredPurposeEnum | null;
  assetContentAsBlobContentType?: string | null;
  assetContentAsBlob?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  assetType?: IAssetType;
  rawAssetProcTmp?: IRawAssetProcTmp | null;
  assetCollections?: IAssetCollection[] | null;
}

export const defaultValue: Readonly<IAsset> = {};
