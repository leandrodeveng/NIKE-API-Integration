import { ClientOrdersHttpService } from './clientOrdersHttp.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientOrderController } from './clientOrders.controller';
import { ClientOrdersService } from './clientOrders.service';
import { ClientOrdersModule } from './clientOrders.module';

@Module({
  imports: [ClientOrdersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
