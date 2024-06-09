import dayjs from 'dayjs';
import { IVenue } from 'app/shared/model/venue.model';
import { ITypeOfEvent } from 'app/shared/model/type-of-event.model';
import { IPerson } from 'app/shared/model/person.model';
import { IAssetCollection } from 'app/shared/model/asset-collection.model';
import { EventStatusEnum } from 'app/shared/model/enumerations/event-status-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IEvent {
  id?: number;
  acronym?: string | null;
  name?: string;
  description?: string;
  fullDescription?: string | null;
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs | null;
  defaultTicketValue?: number;
  status?: keyof typeof EventStatusEnum;
  activationStatus?: keyof typeof ActivationStatusEnum;
  mainVenue?: IVenue | null;
  typeOfEvent?: ITypeOfEvent;
  promoteurPerson?: IPerson | null;
  assetCollections?: IAssetCollection[] | null;
}

export const defaultValue: Readonly<IEvent> = {};
