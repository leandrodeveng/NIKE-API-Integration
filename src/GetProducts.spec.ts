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
    products: [
      {
        ProductCode: 'BV4122-010',
        Description: 'BLUSAO W NSW ESSNTL HOODIE FZ FLC',
        Size: 'P',
        Quantity: 2,
        Price: 197.99,
      },
      {
        ProductCode: 'CU1321-010',
        Description: 'CAMISA 4 CORINTHIANS FEMININO',
        Size: 'M',
        Quantity: 2,
        Price: 83.99,
      },
      {
        ProductCode: 'CW9300-808',
        Description: 'BOLSA W NSW REVEL CROSSBODY',
        Size: 'UNICO',
        Quantity: 2,
        Price: 71.99,
      },
    ],
  });
  expect(products).toStrictEqual(productsSample);
});
