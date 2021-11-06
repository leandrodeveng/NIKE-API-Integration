import { Product } from '../Product/Product';

export interface Order {
	OrderCode: string;
	OrderStatus: string;
	PaymentCondition: string;
	isRefundable: boolean;
	Products: Product[];
}
