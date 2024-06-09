import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IProgram {
  id?: number;
  acronym?: string | null;
  name?: string;
  description?: string | null;
  fullDescription?: string | null;
  targetPublic?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
}

export const defaultValue: Readonly<IProgram> = {};
