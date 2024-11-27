import { EventEntity } from "../../domains/entities/eventEntity";
import { IMessageEmitterRepository } from "../../domains/repositories/IMessageEmitterRepository";
import { PubSubFramework } from "../pubsub/pubsubFramework"; 

export class MessageEmitterRepository implements IMessageEmitterRepository {
  private readonly pubSub: PubSubFramework;

  constructor(pubSub: PubSubFramework) {
    this.pubSub = pubSub;
  }

  publish(event: EventEntity): void {
    this.pubSub.publish(event);
  }
}
