export interface IBrand {
  id?: number;
  acronym?: string;
  name?: string;
  description?: string | null;
  logoBrandContentType?: string | null;
  logoBrand?: string | null;
}

export const defaultValue: Readonly<IBrand> = {};
