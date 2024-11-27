"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockOkSubscriber = void 0;
class StockOkSubscriber {
    handle(event) {
        console.log(`Stock levels for machine ${event.machineId} are OK.`);
    }
}
exports.StockOkSubscriber = StockOkSubscriber;
