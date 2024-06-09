export interface ICustomerType {
  id?: number;
  name?: string;
  description?: string | null;
  businessHandlerClazz?: string | null;
}

export const defaultValue: Readonly<ICustomerType> = {};
