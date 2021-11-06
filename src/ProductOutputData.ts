export class ProductOutputData {
	orderCode: string;
	productCode: string;
	description: string;
	price: number;
	size: string;
	quantity: number;

	constructor({
		orderCode,
		productCode,
		description,
		price,
		size,
		quantity,
	}: {
		orderCode: string;
		productCode: string;
		description: string;
		price: number;
		size: string;
		quantity: number;
	}) {
		(this.orderCode = orderCode),
			(this.productCode = productCode),
			(this.description = description),
			(this.price = price),
			(this.size = size),
			(this.quantity = quantity);
	}
}
