import { IAsset } from 'app/shared/model/asset.model';

export interface IAssetMetadata {
  id?: number;
  metadataDetailsJSON?: string | null;
  asset?: IAsset;
}

export const defaultValue: Readonly<IAssetMetadata> = {};
