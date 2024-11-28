import { EventEntity } from "../../domains/entities/eventEntity";
import { ISubscriber } from "./subscriber";

interface IPublishSubscribeService {
  publish (event: EventEntity): void;
  subscribe (type: string, handler: ISubscriber): void;
  unsubscribe(type: string, handler: ISubscriber): void;
}

export class PubSubFramework implements IPublishSubscribeService {
  private subscribers: Map<string, Set<ISubscriber>> = new Map();

  publish(event: EventEntity): void {
    const handlers = this.subscribers.get(event.topic) || new Set();
    for (const handler of handlers) {
      handler.handle(event);
    }
  }

  subscribe(topic: string, handler: ISubscriber): void {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }
    this.subscribers.get(topic)?.add(handler);
  }

  unsubscribe(topic: string, handler: ISubscriber): void {
    this.subscribers.get(topic)?.delete(handler);
  }
}