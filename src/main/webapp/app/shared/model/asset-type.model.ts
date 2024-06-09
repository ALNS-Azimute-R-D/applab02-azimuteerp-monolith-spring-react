export interface IAssetType {
  id?: number;
  acronym?: string | null;
  name?: string;
  description?: string | null;
  handlerClazzName?: string | null;
  customAttributesDetailsJSON?: string | null;
}

export const defaultValue: Readonly<IAssetType> = {};
