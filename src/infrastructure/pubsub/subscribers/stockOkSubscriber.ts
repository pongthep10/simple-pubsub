import { EventEntity } from "../../../domains/entities/eventEntity";
import { ISubscriber } from "../ISubscriber";

export class StockOkSubscriber implements ISubscriber {
    handle(event: EventEntity): void {
      console.log(`Stock levels for machine ${event.machineId} are OK.`);
    }
  }
  