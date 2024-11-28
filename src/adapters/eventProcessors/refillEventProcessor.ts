import { IEventProcessor } from "src/adapters/IEventProcessor";
import { EventEntity } from "src/domains/entities/eventEntity";
import pubSubFrameworkInstance from "src/infrastructure/pubsub/pubsubFrameworkInstance";
import { MessageEmitterRepository } from "src/infrastructure/repositories/messageEmitterRepository";
import { AddStockUseCase } from "src/usecases/addStockUseCase";
import { MachineRepository } from "src/infrastructure/repositories/machineRepository";

export class RefillEventProcessor implements IEventProcessor {
  constructor(
    private machineRepository = new MachineRepository(),
    private messageEmitterRepository = new MessageEmitterRepository(pubSubFrameworkInstance), // should use the global instance
  ) {}

  process(event: EventEntity): void {
    console.log(`Processing refill event for machine ${event.machineId} with quantity ${event.payload.quantity}`);
    const addStockUseCase = new AddStockUseCase(this.machineRepository, this.messageEmitterRepository);
    addStockUseCase.execute(event.machineId, event.payload.quantity);
  }
}