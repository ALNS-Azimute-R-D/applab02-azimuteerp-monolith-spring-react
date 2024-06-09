import { IAssetType } from 'app/shared/model/asset-type.model';
import { StatusRawProcessingEnum } from 'app/shared/model/enumerations/status-raw-processing-enum.model';

export interface IRawAssetProcTmp {
  id?: number;
  name?: string;
  statusRawProcessing?: keyof typeof StatusRawProcessingEnum | null;
  fullFilenamePath?: string | null;
  assetRawContentAsBlobContentType?: string | null;
  assetRawContentAsBlob?: string | null;
  customAttributesDetailsJSON?: string | null;
  assetType?: IAssetType;
}

export const defaultValue: Readonly<IRawAssetProcTmp> = {};
