export interface ICategory {
  id?: number;
  acronym?: string | null;
  name?: string;
  description?: string | null;
  handlerClazzName?: string | null;
  categoryParent?: ICategory | null;
}

export const defaultValue: Readonly<ICategory> = {};
