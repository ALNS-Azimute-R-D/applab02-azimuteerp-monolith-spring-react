import { IArticle } from 'app/shared/model/article.model';
import { IOrder } from 'app/shared/model/order.model';
import { OrderItemStatusEnum } from 'app/shared/model/enumerations/order-item-status-enum.model';

export interface IOrderItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  status?: keyof typeof OrderItemStatusEnum;
  article?: IArticle;
  order?: IOrder;
}

export const defaultValue: Readonly<IOrderItem> = {};
