import { Product } from '../../Product/Interface/Product';

export interface Order {
	OrderCode: string;
	OrderStatus: string;
	PaymentCondition: string;
	isRefundable: boolean;
	Products: Product[];
}
