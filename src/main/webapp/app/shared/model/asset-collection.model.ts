import { IAsset } from 'app/shared/model/asset.model';
import { IArticle } from 'app/shared/model/article.model';
import { IEvent } from 'app/shared/model/event.model';
import { IActivity } from 'app/shared/model/activity.model';
import { IScheduledActivity } from 'app/shared/model/scheduled-activity.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IAssetCollection {
  id?: number;
  name?: string;
  fullFilenamePath?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  assets?: IAsset[] | null;
  articles?: IArticle[] | null;
  events?: IEvent[] | null;
  activities?: IActivity[] | null;
  scheduledActivities?: IScheduledActivity[] | null;
}

export const defaultValue: Readonly<IAssetCollection> = {};
