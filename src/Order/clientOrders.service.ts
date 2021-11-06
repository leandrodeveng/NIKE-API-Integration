import { Cpf } from '../Client/Cpf';
import { Order } from './Order';

export abstract class ClientOrdersService {
	abstract getOrders(cpf: Cpf): Promise<Order[]>;
}
