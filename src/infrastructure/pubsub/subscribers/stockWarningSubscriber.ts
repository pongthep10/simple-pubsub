import { EventEntity } from "../../../domains/entities/eventEntity";
import { ISubscriber } from "../ISubscriber";

export class StockWarningSubscriber implements ISubscriber {
    handle(event: EventEntity): void {
      console.log(`Warning: Machine ${event.machineId} has low stock.`);
    }
  }