import { ClientOrdersService } from './clientOrders.service';
import { Cpf } from './Cpf';
import { Product } from './Product';
import { ListProductsOutputData } from './ListProductOutputData';
import { ProductOutputData } from './ProductOutputData';

export class GetProducts {
	private clientOrdersService: ClientOrdersService;

	constructor(clientOrdersService: ClientOrdersService) {
		this.clientOrdersService = clientOrdersService;
	}

	async execute(cpf: Cpf): Promise<ListProductsOutputData> {
		const clientOrdersData = await this.clientOrdersService.getOrders(cpf);
		const sortedOrders = clientOrdersData.sort(
			(a, b) =>
				parseInt(b.OrderCode.match(/(\d+)/)[0]) -
				parseInt(a.OrderCode.match(/(\d+)/)[0]),
		);
		const productsHash: { [key: string]: ProductOutputData } = {};
		for (const order of sortedOrders) {
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
}
