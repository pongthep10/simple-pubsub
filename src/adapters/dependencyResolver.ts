import { EventEntity } from "../domains/entities/eventEntity";
import { AddStockUseCase } from "../usecases/addStockUseCase";
import { IMachineRepository } from "../domains/repositories/IMachineRepository";
import { IMessageEmitterRepository } from "../domains/repositories/IMessageEmitterRepository";
import { ReduceStockUseCase } from "../usecases/reduceStockUseCase";

export class DependencyResolver {
    private readonly machineRepository: IMachineRepository;
    private readonly pubSubRepository: IMessageEmitterRepository;
  
    constructor(machineRepository: IMachineRepository, pubSubRepository: IMessageEmitterRepository) {
      this.machineRepository = machineRepository;
      this.pubSubRepository = pubSubRepository;
    }
  
    resolveUseCase(event: EventEntity): void {
      switch (event.type) {
        case 'sale': {
          const reduceStockUseCase = new ReduceStockUseCase(this.machineRepository, this.pubSubRepository);
          reduceStockUseCase.execute(event.machineId, event.payload.quantity);
          break;
        }
        case 'refill': {
          const addStockUseCase = new AddStockUseCase(this.machineRepository, this.pubSubRepository);
          addStockUseCase.execute(event.machineId, event.payload.quantity);
          break;
        }
        default: {
          console.log(`No use case found for event type: ${event.type}`);
          break;
        }
      }
    }
  }
  