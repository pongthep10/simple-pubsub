import { IEventProcessor } from "../IEventProcessor";
import { EventEntity } from "src/domains/entities/eventEntity";
import { PubSubFramework } from "src/infrastructure/pubsub/pubsubFramework";
import { MessageEmitterRepository } from "src/infrastructure/repositories/messageEmitterRepository";
import { AddStockUseCase } from "src/usecases/addStockUseCase";
import { MachineRepository } from "src/infrastructure/repositories/machineRepository";

class RefillEventProcessor implements IEventProcessor {
  constructor(
    private machineRepository = new MachineRepository(),
    private messageEmitterRepository = new MessageEmitterRepository(new PubSubFramework()),
  ) {}

  process(event: EventEntity): void {
    console.log(`Processing refill event for machine ${event.machineId} with quantity ${event.payload.quantity}`);
    const addStockUseCase = new AddStockUseCase(this.machineRepository, this.messageEmitterRepository);
    addStockUseCase.execute(event.machineId, event.payload.quantity);
  }
}

export { RefillEventProcessor };
