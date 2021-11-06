import { Module } from '@nestjs/common';
import { ClientOrdersModule } from './clientOrders.module';

@Module({
  imports: [ClientOrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
