import { ClientOrdersHttpService } from './clientOrdersHttp.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientOrderController } from './clientOrders.controller';
import { ClientOrdersService } from './clientOrders.service';

@Module({
  imports: [HttpModule],
  controllers: [ClientOrderController],
  providers: [
    {
      provide: ClientOrdersService,
      useClass: ClientOrdersHttpService
    }],
})
export class ClientOrdersModule {}
