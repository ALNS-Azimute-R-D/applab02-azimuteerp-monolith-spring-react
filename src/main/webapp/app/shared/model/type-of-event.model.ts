export interface ITypeOfEvent {
  id?: number;
  acronym?: string | null;
  name?: string;
  description?: string | null;
  handlerClazzName?: string | null;
}

export const defaultValue: Readonly<ITypeOfEvent> = {};
