export abstract class ClientOrdersService {
    abstract getOrders(): Promise<any[]>;
}
