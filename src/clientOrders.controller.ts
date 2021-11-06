import { Controller, Get, Param } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ClientOrdersService } from './clientOrders.service';
import { Cpf } from './Cpf';
import { GetProducts } from './GetProducts';
import { ListProductsOutputData } from './ListProductOutputData';

@Controller('orders')
@ApiTags('Orders')
export class ClientOrderController {
	constructor(private readonly clientOrdersService: ClientOrdersService) {}

	@Get(':cpf')
	async findProducts(
		@Param('cpf') cpfIntupData: string,
	): Promise<ListProductsOutputData> {
		const getProducts = new GetProducts(this.clientOrdersService);
		const cpf = new Cpf(cpfIntupData);
		return await getProducts.execute(cpf);
	}
}
