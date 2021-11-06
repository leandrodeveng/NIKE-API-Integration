import { ClientOrdersMemoryService } from './clientOrdersMemory.service';
import { GetProducts } from './GetProducts';
import { ClientOrdersService } from './clientOrders.service';
import { ListProductsOutputData } from './ListProductOutputData';
import { Cpf } from './Cpf';
import { ProductOutputData } from './ProductOutputData';

let clientOrdersService: ClientOrdersService;
let getProducts: GetProducts;

beforeEach(() => {
	clientOrdersService = new ClientOrdersMemoryService();
	getProducts = new GetProducts(clientOrdersService);
});

test('Should return last 5 items', async () => {
	const cpf = new Cpf('464.972.498-85');
	const products = await getProducts.execute(cpf);
	const productsSample = new ListProductsOutputData({
		count: 3,
		products: [
			new ProductOutputData({
				productCode: 'BV4122-010',
				description: 'BLUSAO W NSW ESSNTL HOODIE FZ FLC',
				size: 'P',
				quantity: 2,
				price: 197.99,
				orderCode: 'WEB-397983570'
			}),
			new ProductOutputData({
				productCode: 'CU1321-010',
				description: 'CAMISA 4 CORINTHIANS FEMININO',
				size: 'M',
				quantity: 2,
				price: 83.99,
				orderCode: 'WEB-349932750'
			}),
			new ProductOutputData({
				productCode: 'CW9300-808',
				description: 'BOLSA W NSW REVEL CROSSBODY',
				size: 'UNICO',
				quantity: 2,
				price: 71.99,
				orderCode: 'WEB-349925370'
			}),
		],
	});
	expect(products).toStrictEqual(productsSample);
});
