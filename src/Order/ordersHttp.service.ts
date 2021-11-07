import { HttpService } from '@nestjs/axios';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OrdersService } from './orders.service';
import { Cpf } from '../Client/Cpf';
import { Order } from './Interface/Order';

interface orderRequestedDataFormat {
	OrderCount: number;
	Orders: Order[];
}

export class OrdersHttpService implements OrdersService {
	orders: { OrderCount: number; Orders: Order[] };
	ibotApi: string = 'https://ibot.ifcdns.com.br:7790/api/';

	constructor(
		@Inject(HttpService)
		private readonly httpService: HttpService,
	) {}

	async getOrders(cpf: Cpf): Promise<Order[]> {
		let orders: Observable<Order[]>;
		orders = this.httpService
			.get<orderRequestedDataFormat>(
				`${this.ibotApi}Order/cpf?=&cpf=${cpf.getCpf()}`,
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
			.pipe(
				catchError((error) => {
					throw new InternalServerErrorException(
						'Fail on communication with nike API',
					);
				}),
				map((resp) => resp.data.Orders),
			);
		return await lastValueFrom(orders);
	}
}
