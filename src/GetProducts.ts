import { ClientOrdersService } from './clientOrders.service';
import { Product } from './Product';
import { ProductsOutputData } from './ProductsOutputData';

export class GetProducts {
  private clientOrdersService: ClientOrdersService;

  constructor(clientOrdersService: ClientOrdersService) {
    this.clientOrdersService = clientOrdersService;
  }

  async execute(): Promise<ProductsOutputData> {
    const clientOrdersData = await this.clientOrdersService.getOrders();
    const sortedOrders = clientOrdersData.sort((a, b) => parseInt(b.OrderCode.match(/(\d+)/)[0]) - parseInt(a.OrderCode.match(/(\d+)/)[0]));
    const productsHash: { [key: string]: Product } = {};
    for(const order of sortedOrders) {
      for(const product of order.Products) {
        productsHash[product.ProductCode] ? 
          productsHash[product.ProductCode].Quantity ++ :
          productsHash[product.ProductCode] = product

        if(Object.keys(productsHash).length === 5) break 
      }
    }
    return new ProductsOutputData({
      count: 3,
      products: Object.values(productsHash),
    });
  }
}
