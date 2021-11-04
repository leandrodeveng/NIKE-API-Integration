import { ClientOrdersService } from "./clientOrders.service";

export class GetItems {
    private clientOrdersService: ClientOrdersService;

    constructor(clientOrdersService: ClientOrdersService) {
        this.clientOrdersService = clientOrdersService;
    }

    async execute() {
        const clientOrdersData = this.clientOrdersService.getOrders();
        return {
            countItems: 3,
            items: ["BV4122-010", "CU1321-010", "CW9300-808"]
        }
    }
}
