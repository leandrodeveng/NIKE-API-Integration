import { Module } from '@nestjs/common';
import { ClientOrdersModule } from './Order/orders.module';

@Module({
	imports: [ClientOrdersModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
