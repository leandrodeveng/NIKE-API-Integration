import { OrdersHttpService } from './ordersHttp.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
	imports: [HttpModule],
	controllers: [OrderController],
	providers: [
		{
			provide: OrdersService,
			useClass: OrdersHttpService,
		},
	],
})
export class OrdersModule {}
