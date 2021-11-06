import { ClientOrdersService } from './clientOrders.service';
import { Cpf } from './Cpf';
import { ListProductsOutputData } from './ListProductOutputData';
import { ProductOutputData } from './ProductOutputData';

export class GetProducts {
	private clientOrdersService: ClientOrdersService;

	constructor(clientOrdersService: ClientOrdersService) {
		this.clientOrdersService = clientOrdersService;
	}

	async execute(cpf: Cpf): Promise<ListProductsOutputData> {
		const clientOrdersData = await this.clientOrdersService.getOrders(cpf);
		const decrescentOrders = clientOrdersData.sort(
			(firstOrder, secondOrder) =>
				this.extractOrderSequence(secondOrder.OrderCode) -
				this.extractOrderSequence(firstOrder.OrderCode)
		);
		const productsHash: { [key: string]: ProductOutputData } = {};
		for (const order of decrescentOrders) {
			for (const product of order.Products) {
				const key = `${order.OrderCode}@${product.ProductCode}`;
				productsHash[key]
					? productsHash[key].quantity++
					: (productsHash[key] = new ProductOutputData({
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
			count: Object.values(productsHash).length,
			products: Object.values(productsHash).slice(0, 5),
		});
	}

	private extractOrderSequence(orderCode: string): number {
		return parseInt(orderCode.match(/(\d+)/)[0]);
	}
}
