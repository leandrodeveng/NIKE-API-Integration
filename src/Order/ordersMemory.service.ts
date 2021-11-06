import { ClientOrdersService } from './orders.service';
import { Order } from './Interface/Order';

export class ClientOrdersMemoryService implements ClientOrdersService {
	orders: { OrderCount: number; Orders: Order[] };

	constructor() {
		this.orders = {
			OrderCount: 2,
			Orders: [
				{
					OrderCode: 'WEB-111111111A',
					OrderStatus: 'ENTREGUE',
					PaymentCondition: 'VISA CREDITO/1P',
					isRefundable: false,
					Products: [
						{
							ProductCode: 'I1',
							Description: 'CAMISA 4 CORINTHIANS FEMININO',
							Size: 'M',
							Quantity: '1',
							Price: 83.99,
						}
					],
				},
				{
					OrderCode: 'WEB-111111111A',
					OrderStatus: 'ENTREGUE',
					PaymentCondition: 'VISA CREDITO/1P',
					isRefundable: false,
					Products: [
						{
							ProductCode: 'I1',
							Description: 'CAMISA 4 CORINTHIANS FEMININO',
							Size: 'M',
							Quantity: '1',
							Price: 83.99,
						},
						{
							ProductCode: 'I2',
							Description: 'CAMISA 4 CORINTHIANS FEMININO',
							Size: 'M',
							Quantity: '1',
							Price: 83.99,
						},
						{
							ProductCode: 'I1',
							Description: 'CAMISA 4 CORINTHIANS FEMININO',
							Size: 'M',
							Quantity: '1',
							Price: 83.99,
						},
					],
				},
				{
					OrderCode: 'WEB-222222222',
					OrderStatus: 'ENTREGUE',
					PaymentCondition: 'MASTERCARD CREDITO/1P',
					isRefundable: true,
					Products: [
						{
							ProductCode: 'I1',
							Description: 'BLUSAO W NSW ESSNTL HOODIE FZ FLC',
							Size: 'P',
							Quantity: '1',
							Price: 197.99,
						},
						{
							ProductCode: 'I1',
							Description: 'BLUSAO W NSW ESSNTL HOODIE FZ FLC',
							Size: 'P',
							Quantity: '1',
							Price: 197.99,
						},
						{
							ProductCode: 'I2',
							Description: 'BLUSAO W NSW ESSNTL HOODIE FZ FLC',
							Size: 'P',
							Quantity: '1',
							Price: 197.99,
						},
						{
							ProductCode: 'I3',
							Description: 'BLUSAO W NSW ESSNTL HOODIE FZ FLC',
							Size: 'P',
							Quantity: '1',
							Price: 197.99,
						},
						{
							ProductCode: 'I4',
							Description: 'BLUSAO W NSW ESSNTL HOODIE FZ FLC',
							Size: 'P',
							Quantity: '1',
							Price: 197.99,
						},
					],
				},
			],
		};
	}

	async getOrders(): Promise<any[]> {
		return this.orders.Orders;
	}
}
