import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientOrdersService } from './clientOrders.service';
import { Cpf } from './Cpf';
import { Order } from './Order';

interface orderRequestedDataFormat {
    OrderCount: number,
    Orders: {
        OrderCode: string,
        OrderStatus: string,
        PaymentCondition: string,
        isRefundable: false,
        Products: {
            ProductCode: string,
            Description: string,
            Size: string,
            Quantity: string,
            Price: number
        }[]
    }[]
}

export class ClientOrdersHttpService implements ClientOrdersService {
  orders: { OrderCount: number; Orders: Order[] };
  ibotApi: string = 'https://ibot.ifcdns.com.br:7790/api/';

  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService
    ) {}

  async getOrders(cpf: Cpf): Promise<Order[]> {
    let orders;
    try {
      orders = this.httpService.get(
        `${this.ibotApi}Order/cpf?=&cpf=${cpf.getCpf()}`,
        {
            headers: { 'Content-Type': 'application/json' }
        }
      ).pipe(
          map(resp => resp.data.Orders),
      );
    } catch(error) {
      throw new Error('External call error')
    }
    return await lastValueFrom(orders);
  }
}
