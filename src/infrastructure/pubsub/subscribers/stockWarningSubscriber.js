"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockWarningSubscriber = void 0;
class StockWarningSubscriber {
    handle(event) {
        console.log(`Warning: Machine ${event.machineId} has low stock.`);
    }
}
exports.StockWarningSubscriber = StockWarningSubscriber;
