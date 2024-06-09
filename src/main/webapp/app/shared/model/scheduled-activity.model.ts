import dayjs from 'dayjs';
import { IProgram } from 'app/shared/model/program.model';
import { IActivity } from 'app/shared/model/activity.model';
import { IPerson } from 'app/shared/model/person.model';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IScheduledActivity {
  id?: number;
  customizedName?: string | null;
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs | null;
  numberOfAttendees?: number | null;
  averageEvaluationInStars?: number | null;
  customAttributtesDetailsJSON?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  program?: IProgram | null;
  activity?: IActivity | null;
  responsiblePerson?: IPerson | null;
  assetCollections?: IAssetCollection[] | null;
}

export const defaultValue: Readonly<IScheduledActivity> = {};
