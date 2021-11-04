import { ClientOrdersService } from "./clientOrders.service";

export class ClientOrdersMemoryService implements ClientOrdersService {
    orders: any;

    constructor() {
        this.orders = {
            "OrderCount": 3,
            "Orders": [
                {
                    "OrderCode":"WEB-349925370",
                    "OrderStatus":"ENTREGUE",
                    "PaymentCondition":"MASTERCARD CREDITO/1P",
                    "isRefundable":false,
                    "Products":[
                        {
                            "ProductCode":"CW9300-808",
                            "Description":"BOLSA W NSW REVEL CROSSBODY",
                            "Size":"UNICO",
                            "Quantity":"1",
                            "Price":71.99
                        },
                        {
                            "ProductCode":"CW9300-808",
                            "Description":"BOLSA W NSW REVEL CROSSBODY",
                            "Size":"UNICO",
                            "Quantity":"1",
                            "Price":71.99
                        }
                    ]
                    },
                    {
                    "OrderCode":"WEB-349932750",
                    "OrderStatus":"ENTREGUE",
                    "PaymentCondition":"VISA CREDITO/1P",
                    "isRefundable":false,
                    "Products":[
                        {
                            "ProductCode":"CU1321-010",
                            "Description":"CAMISA 4 CORINTHIANS FEMININO",
                            "Size":"M",
                            "Quantity":"1",
                            "Price":83.99
                        },
                        {
                            "ProductCode":"CU1321-010",
                            "Description":"CAMISA 4 CORINTHIANS FEMININO",
                            "Size":"M",
                            "Quantity":"1",
                            "Price":83.99
                        }
                    ]
                    },
                    {
                    "OrderCode":"WEB-397983570",
                    "OrderStatus":"ENTREGUE",
                    "PaymentCondition":"MASTERCARD CREDITO/1P",
                    "isRefundable":true,
                    "Products":[
                        {
                            "ProductCode":"BV4122-010",
                            "Description":"BLUSAO W NSW ESSNTL HOODIE FZ FLC",
                            "Size":"P",
                            "Quantity":"1",
                            "Price":197.99
                        },
                        {
                            "ProductCode":"BV4122-010",
                            "Description":"BLUSAO W NSW ESSNTL HOODIE FZ FLC",
                            "Size":"P",
                            "Quantity":"1",
                            "Price":197.99
                        }
                    ]
                    }
            ]
        };
    }

    async getOrders(): Promise<any[]> {
        return this.orders.Orders;
    }
}
