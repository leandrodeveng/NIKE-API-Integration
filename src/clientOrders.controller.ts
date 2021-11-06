import { Controller, Get, Param } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ClientOrdersService } from './clientOrders.service';
import { GetProducts } from './GetProducts';
import { ProductsOutputData } from './ProductsOutputData';

@Controller('orders')
@ApiTags('Orders')
export class ClientOrderController {
    constructor(private readonly clientOrdersService: ClientOrdersService) {}

  @Get(':cpf')
  async findProducts(
    @Param('cpf') cpf: string
  ): Promise<ProductsOutputData> {
    const getProducts = new GetProducts(this.clientOrdersService);
    return await getProducts.execute(cpf)
  }
}
