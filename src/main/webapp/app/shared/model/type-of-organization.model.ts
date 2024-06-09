export interface ITypeOfOrganization {
  id?: number;
  acronym?: string;
  name?: string;
  description?: string;
  businessHandlerClazz?: string | null;
}

export const defaultValue: Readonly<ITypeOfOrganization> = {};
