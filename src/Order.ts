import { Product } from './Product';

export interface Order {
	OrderCode: string;
	OrderStatus: string;
	PaymentCondition: string;
	isRefundable: boolean;
	Products: Product[];
}
