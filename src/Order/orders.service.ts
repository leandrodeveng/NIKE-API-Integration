import { Cpf } from '../Client/Cpf';
import { Order } from './Interface/Order';

export abstract class ClientOrdersService {
	abstract getOrders(cpf: Cpf): Promise<Order[]>;
}
