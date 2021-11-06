import { ProductOutputData } from './ProductOutputData';

export class ListProductsOutputData {
	count: number;
	products: ProductOutputData[];

	constructor({ count, products }: { count: number; products: ProductOutputData[] }) {
		this.count = count;
		this.products = products;
	}
}
