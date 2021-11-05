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
    const productsHash: { [key: string]: { ProductCode: string, Description: string, Price: number, Size: string, Quantity: number } } = {};
    for(const order of sortedOrders) {
      for(const product of order.Products) {
        const key = order.OrderCode + product.ProductCode;
        productsHash[key] ? 
          productsHash[key].Quantity ++ :
          productsHash[key] = {
            ProductCode: product.ProductCode,
            Description: product.Description,
            Price: product.Price,
            Size: product.Size,
            Quantity: parseInt(product.Quantity)
          }
      }
    }
    return new ProductsOutputData({
      count: Object.values(productsHash).length,
      products: Object.values(productsHash).slice(0,5),
    });
  }
}
