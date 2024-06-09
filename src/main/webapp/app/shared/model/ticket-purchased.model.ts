import dayjs from 'dayjs';
import { IEvent } from 'app/shared/model/event.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface ITicketPurchased {
  id?: number;
  buyingCode?: string | null;
  duePaymentDate?: dayjs.Dayjs | null;
  amountOfTickets?: number | null;
  taxValue?: number | null;
  ticketValue?: number | null;
  acquiredSeatsNumbers?: string | null;
  description?: string | null;
  event?: IEvent | null;
  invoice?: IInvoice | null;
}

export const defaultValue: Readonly<ITicketPurchased> = {};
