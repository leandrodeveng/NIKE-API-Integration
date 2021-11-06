export class ProductsOutputData {
	count: number;
	products: any[];

	constructor({ count, products }: { count: number; products: any[] }) {
		this.count = count;
		this.products = products;
	}
}
