import { Module } from '@nestjs/common';
import { OrdersModule } from './Order/orders.module';

@Module({
	imports: [OrdersModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
