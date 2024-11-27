import { EventEntity } from "../../domains/entities/eventEntity";
import { ISubscriber } from "./ISubscriber";

export class PubSubFramework {
  private subscribers: Map<string, Set<ISubscriber>> = new Map();

  publish(event: EventEntity): void {
    const handlers = this.subscribers.get(event.type) || new Set();
    for (const handler of handlers) {
      handler.handle(event);
    }
  }

  subscribe(type: string, handler: ISubscriber): void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type)?.add(handler);
  }

  unsubscribe(type: string, handler: ISubscriber): void {
    this.subscribers.get(type)?.delete(handler);
  }
}
