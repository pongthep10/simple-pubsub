import { EventEntity } from "src/domains/entities/eventEntity";

export interface IEventProcessor {
  process(event: EventEntity): void;
}