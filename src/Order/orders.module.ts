import { ClientOrdersHttpService } from './ordersHttp.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientOrderController } from './orders.controller';
import { ClientOrdersService } from './orders.service';

@Module({
	imports: [HttpModule],
	controllers: [ClientOrderController],
	providers: [
		{
			provide: ClientOrdersService,
			useClass: ClientOrdersHttpService,
		},
	],
})
export class ClientOrdersModule {}
