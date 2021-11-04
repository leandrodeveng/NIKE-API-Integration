import { Order } from './Order';

export abstract class ClientOrdersService {
  abstract getOrders(): Promise<Order[]>;
}
