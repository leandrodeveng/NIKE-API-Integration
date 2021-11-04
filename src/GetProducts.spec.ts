import { ClientOrdersMemoryService } from './clientOrdersMemory.service';
import { GetProducts } from './GetProducts';
import { ClientOrdersService } from './clientOrders.service';
import { ProductsOutputData } from './ProductsOutputData';

let clientOrdersService: ClientOrdersService;
let getProducts: GetProducts;

beforeEach(() => {
  clientOrdersService = new ClientOrdersMemoryService();
  getProducts = new GetProducts(clientOrdersService);
});

test('Should return last 5 items', async () => {
  const products = await getProducts.execute();
  const productsSample = new ProductsOutputData({
    count: 3,
    products: ['BV4122-010', 'CU1321-010', 'CW9300-808'],
  });
  expect(products).toStrictEqual(productsSample);
});
