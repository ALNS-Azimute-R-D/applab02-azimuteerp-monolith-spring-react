import { IPerson } from 'app/shared/model/person.model';
import { IEvent } from 'app/shared/model/event.model';
import { ITicketPurchased } from 'app/shared/model/ticket-purchased.model';

export interface IEventAttendee {
  id?: number;
  attendedAsRole?: string;
  wasPresentInEvent?: boolean | null;
  shouldBuyTicket?: boolean | null;
  ticketNumber?: string | null;
  seatNumber?: string | null;
  attendeePerson?: IPerson | null;
  event?: IEvent | null;
  ticketPurchased?: ITicketPurchased | null;
}

export const defaultValue: Readonly<IEventAttendee> = {
  wasPresentInEvent: false,
  shouldBuyTicket: false,
};
