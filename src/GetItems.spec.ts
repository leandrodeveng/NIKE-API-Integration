import { ClientOrdersMemoryService } from './clientOrdersMemory.service';
import { GetItems } from './GetItems';
import { ClientOrdersService } from "./clientOrders.service";

let clientOrdersService: ClientOrdersService;
let getItems: GetItems;

beforeEach(() => {
    clientOrdersService = new ClientOrdersMemoryService();
    getItems = new GetItems(clientOrdersService);
})

test('Should return last 5 items', async () => {
    const itens = await getItems.execute();
    expect(itens).toStrictEqual({
        countItems: 3,
        items: ["BV4122-010", "CU1321-010", "CW9300-808"]
    });
});
