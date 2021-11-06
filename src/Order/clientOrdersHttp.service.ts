import { HttpService } from '@nestjs/axios';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ClientOrdersService } from './clientOrders.service';
import { Cpf } from '../Client/Cpf';
import { Order } from './Order';

interface orderRequestedDataFormat {
	OrderCount: number;
	Orders: Order[];
}

export class ClientOrdersHttpService implements ClientOrdersService {
	orders: { OrderCount: number; Orders: Order[] };
	ibotApi: string = 'https://ibot.ifcdns.com.br:7790/api/';

	constructor(
		@Inject(HttpService)
		private readonly httpService: HttpService,
	) {}

	async getOrders(cpf: Cpf): Promise<Order[]> {
		let orders;
		orders = this.httpService
			.get<orderRequestedDataFormat>(`${this.ibotApi}Order/cpf?=&cpf=${cpf.getCpf()}`, {
				headers: { 'Content-Type': 'application/json' },
			})
			.pipe(
				catchError(error => { throw new InternalServerErrorException('Fail on communication with nike API') }),
				map((resp) => resp.data.Orders)
			);
		return await lastValueFrom(orders);
	}
}
