import { Cpf } from '../Client/Cpf';
import { Order } from './Interface/Order';

export abstract class OrdersService {
	abstract getOrders(cpf: Cpf): Promise<Order[]>;
}
