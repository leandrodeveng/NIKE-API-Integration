import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientOrdersService } from './clientOrders.service';
import { Cpf } from '../Client/Cpf';
import { GetProducts } from './GetProducts';
import { ListProductsOutputData } from 'src/Product/ListProductOutputData';

@Controller('orders')
@ApiTags('Orders')
export class ClientOrderController {
	constructor(private readonly clientOrdersService: ClientOrdersService) {}

	@Get(':cpf/last-products')
	@ApiParam({ name: 'cpf', required: true, description: 'Client CPF (format: xxx.xxx.xxx-xx)' })
	@ApiResponse({ status: 200, description: 'The products has successfully returned'})
	@ApiResponse({ status: 400, description: 'Something went wrong with the CPF sended'})
	@ApiResponse({ status: 500, description: 'Internal server error. Please contact the support'})
	@ApiOperation({ description: 'Should return the last 5 products of client orders and the count' })
	async findProducts(
		@Param('cpf') cpfIntupData: string,
	): Promise<ListProductsOutputData> {
		const cpf = new Cpf(cpfIntupData);
		return await new GetProducts(this.clientOrdersService).execute(cpf);
	}
}
