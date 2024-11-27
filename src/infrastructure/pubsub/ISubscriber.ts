import { EventEntity } from "../../domains/entities/eventEntity";

export interface ISubscriber {
    handle(event: EventEntity): void;
}