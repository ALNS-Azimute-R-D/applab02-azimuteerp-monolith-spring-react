import { IEvent } from 'app/shared/model/event.model';
import { IProgram } from 'app/shared/model/program.model';
import { IPerson } from 'app/shared/model/person.model';

export interface IEventProgram {
  id?: number;
  percentageExecution?: number | null;
  event?: IEvent | null;
  program?: IProgram | null;
  responsiblePerson?: IPerson | null;
}

export const defaultValue: Readonly<IEventProgram> = {};
