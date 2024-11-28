import { IEventProcessor } from "src/adapters/IEventProcessor";
import { EventEntity } from "src/domains/entities/eventEntity";
import pubSubFrameworkInstance from "src/infrastructure/pubsub/pubsubFrameworkInstance";
import { MessageEmitterRepository } from "src/infrastructure/repositories/messageEmitterRepository";
import { ReduceStockUseCase } from "src/usecases/reduceStockUseCase";
import { MachineRepository } from "src/infrastructure/repositories/machineRepository";


export class SaleEventProcessor implements IEventProcessor {
  constructor(
    private machineRepository = new MachineRepository(),
    private messageEmitterRepository = new MessageEmitterRepository(pubSubFrameworkInstance),
  ) {}

  process(event: EventEntity): void {
    console.log(`Processing sale event for machine ${event.machineId} with quantity ${event.payload.quantity}`);
    const reduceStockUseCase = new ReduceStockUseCase(this.machineRepository, this.messageEmitterRepository);
    reduceStockUseCase.execute(event.machineId, event.payload.quantity);
  }
}
