import { ClientOrdersService } from './clientOrders.service';
import { ProductsOutputData } from './ProductsOutputData';

export class GetProducts {
  private clientOrdersService: ClientOrdersService;

  constructor(clientOrdersService: ClientOrdersService) {
    this.clientOrdersService = clientOrdersService;
  }

  async execute(): Promise<ProductsOutputData> {
    const clientOrdersData = this.clientOrdersService.getOrders();
    return new ProductsOutputData({
      count: 3,
      products: ['BV4122-010', 'CU1321-010', 'CW9300-808'],
    });
  }
}
