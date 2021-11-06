import { ClientOrdersMemoryService } from './ordersMemory.service';
import { GetProducts } from './GetLastOrdersProducts';
import { ClientOrdersService } from './orders.service';
import { ListProductsOutputData } from '../Product/ListProductOutputData';
import { Cpf } from '../Client/Cpf';
import { ProductOutputData } from '../Product/ProductOutputData';

let clientOrdersService: ClientOrdersService;
let getProducts: GetProducts;

beforeEach(() => {
	clientOrdersService = new ClientOrdersMemoryService();
	getProducts = new GetProducts(clientOrdersService);
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
	for(const expectedProduct of expectedProducts) {
		const product = products.products.find(product => 
			product.orderCode === expectedProduct.orderCode &&
			product.productCode === expectedProduct.productCode &&
			product.quantity === expectedProduct.quantity
		);
		expect(product).not.toBeUndefined()
	}
});

test('Should not return more than 5 items', async () => {
	const cpf = new Cpf('464.972.498-85');
	const products = await getProducts.execute(cpf);
	expect(products.products.length).toBeLessThanOrEqual(5);
});
