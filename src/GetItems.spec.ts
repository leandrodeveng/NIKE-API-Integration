import { ClientOrdersMemoryService } from './clientOrdersMemory.service';
import { GetItems } from './GetItems';
import { ClientOrdersService } from "./clientOrders.service";
import { ProductsOutputData } from './ProductsOutputData';

let clientOrdersService: ClientOrdersService;
let getItems: GetItems;

beforeEach(() => {
    clientOrdersService = new ClientOrdersMemoryService();
    getItems = new GetItems(clientOrdersService);
})

test('Should return last 5 items', async () => {
    const products = await getItems.execute();
    const productsSample = new ProductsOutputData({
        count: 3,
        products: ["BV4122-010", "CU1321-010", "CW9300-808"]
    });
    expect(products).toStrictEqual(productsSample);
});
