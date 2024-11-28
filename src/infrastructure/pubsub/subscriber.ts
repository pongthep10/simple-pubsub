import { EventEntity } from "src/domains/entities/eventEntity";
import { IEventProcessor } from "src/adapters/IEventProcessor";

export interface ISubscriber {
    handle(event: EventEntity): void;
  }

export class Subscriber implements ISubscriber {
    private topic: string;
    private eventProcessor: IEventProcessor;
  
    constructor(topic: string, eventProcessor: IEventProcessor) {
      this.topic = topic;
      this.eventProcessor = eventProcessor;
    }
  
    handle(event: EventEntity): void {
      console.log(`Subscriber for topic "${this.topic}" handling event: ${event.topic}`);
      this.eventProcessor.process(event);
    }
  }