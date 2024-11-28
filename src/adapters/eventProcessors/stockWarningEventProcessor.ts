import { IEventProcessor } from "src/adapters/IEventProcessor";
import { EventEntity } from "src/domains/entities/eventEntity";

export class StockWarningEventProcessor implements IEventProcessor {
  process(event: EventEntity): void {
    console.log(`⚠️ Low stock warning for machine ${event.machineId}.`);
  }
}
