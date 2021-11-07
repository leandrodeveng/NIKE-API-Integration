import { OrdersService } from './orders.service';
import { Cpf } from '../Client/Cpf';
import { ListProductsOutputData } from '../Product/ListProductOutputData';
import { ProductOutputData } from '../Product/ProductOutputData';

export class GetLastOrdersProducts {
	private ordersService: OrdersService;

	constructor(ordersService: OrdersService) {
		this.ordersService = ordersService;
	}

	async execute(cpf: Cpf): Promise<ListProductsOutputData> {
		const ordersData = await this.ordersService.getOrders(cpf);
		const decrescentOrders = ordersData.sort(
			(firstOrder, secondOrder) =>
				this.extractOrderSequence(secondOrder.OrderCode) -
				this.extractOrderSequence(firstOrder.OrderCode),
		);
		const productsObj: { [key: string]: ProductOutputData } = {};
		for (const order of decrescentOrders) {
			for (const product of order.Products) {
				const key = `${order.OrderCode}@${product.ProductCode}`;
				productsObj[key]
					? productsObj[key].quantity++
					: (productsObj[key] = new ProductOutputData({
							orderCode: key.split('@')[0],
							productCode: product.ProductCode,
							description: product.Description,
							price: product.Price,
							size: product.Size,
							quantity: parseInt(product.Quantity),
					  }));
			}
		}
		return new ListProductsOutputData({
			count: Object.values(productsObj).length,
			products: Object.values(productsObj).slice(0, 5),
		});
	}

	private extractOrderSequence(orderCode: string): number {
		return parseInt(orderCode.match(/(\d+)/)[0]);
	}
}
