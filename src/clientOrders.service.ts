import { Order } from './Order';

export abstract class ClientOrdersService {
  abstract getOrders(cpf: string): Promise<Order[]>;
}
