import { EventEntity } from "src/domains/entities/eventEntity";

export interface IMessageEmitterRepository {
    publish(event: EventEntity): void;
}
  