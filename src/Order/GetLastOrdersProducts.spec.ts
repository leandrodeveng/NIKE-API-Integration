import { OrdersMemoryService } from './ordersMemory.service';
import { GetLastOrdersProducts } from './GetLastOrdersProducts';
import { OrdersService } from './orders.service';
import { Cpf } from '../Client/Cpf';

let clientOrdersService: OrdersService;
let getProducts: GetLastOrdersProducts;

beforeEach(() => {
	clientOrdersService = new OrdersMemoryService();
	getProducts = new GetLastOrdersProducts(clientOrdersService);
});

test('Should return the last 5 items', async () => {
	const cpf = new Cpf('464.972.498-85');
	const products = await getProducts.execute(cpf);
	const expectedProducts = [
		{ orderCode: 'WEB-222222222', productCode: 'I1', quantity: 2 },
		{ orderCode: 'WEB-222222222', productCode: 'I2', quantity: 1 },
		{ orderCode: 'WEB-222222222', productCode: 'I3', quantity: 1 },
		{ orderCode: 'WEB-222222222', productCode: 'I4', quantity: 1 },
		{ orderCode: 'WEB-111111111A', productCode: 'I1', quantity: 3 },
	];
	for (const expectedProduct of expectedProducts) {
		const product = products.products.find(
			(product) =>
				product.orderCode === expectedProduct.orderCode &&
				product.productCode === expectedProduct.productCode &&
				product.quantity === expectedProduct.quantity,
		);
		expect(product).not.toBeUndefined();
	}
});

test('Should not return more than 5 items', async () => {
	const cpf = new Cpf('464.972.498-85');
	const products = await getProducts.execute(cpf);
	expect(products.products.length).toBeLessThanOrEqual(5);
});

test('Should return correct count of products', async () => {
	const cpf = new Cpf('464.972.498-85');
	const products = await getProducts.execute(cpf);
	expect(products.count).toBe(6);
});
