import { EventEntity } from "src/domains/entities/eventEntity";
import { IMessageEmitterRepository } from "src/domains/repositories/IMessageEmitterRepository";
import { PubSubFramework } from "src/infrastructure/pubsub/pubsubFramework"; 

export class MessageEmitterRepository implements IMessageEmitterRepository {
  private readonly pubSub: PubSubFramework;

  constructor(pubSub: PubSubFramework) {
    this.pubSub = pubSub;
  }

  publish(event: EventEntity): void {
    this.pubSub.publish(event);
  }
}
