import dayjs from 'dayjs';
import { ITypeOfActivity } from 'app/shared/model/type-of-activity.model';
import { IPerson } from 'app/shared/model/person.model';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IActivity {
  id?: number;
  name?: string;
  shortDescription?: string | null;
  fullDescription?: string | null;
  mainGoals?: string | null;
  estimatedDurationTime?: string | null;
  lastPerformedDate?: dayjs.Dayjs | null;
  createdAt?: dayjs.Dayjs | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  typeOfActivity?: ITypeOfActivity;
  createdByUser?: IPerson | null;
  assetCollections?: IAssetCollection[] | null;
}

export const defaultValue: Readonly<IActivity> = {};
