import { EventEntity } from "../entities/eventEntity";

export interface IMessageEmitterRepository {
    publish(event: EventEntity): void;
}
  