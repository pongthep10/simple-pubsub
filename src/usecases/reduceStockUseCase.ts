import { EventEntity } from "../domains/entities/eventEntity";
import { IMachineRepository } from "../domains/repositories/IMachineRepository";
import { IMessageEmitterRepository } from "../domains/repositories/IMessageEmitterRepository";

export class ReduceStockUseCase {
  constructor(
    private machineRepository: IMachineRepository,
    private messageEmitterRepository: IMessageEmitterRepository
  ) {}

  execute(machineId: string, quantity: number): void {
    const machine = this.machineRepository.getMachine(machineId);
    if (!machine) throw new Error(`Machine ${machineId} not found`);

    const newStock = machine.stock - quantity;
    this.machineRepository.updateStock(machineId, newStock);

    if (newStock < 3 && !machine.lowStockWarningSent) {
      // Generate and publish LowStockWarningEvent
      const lowStockWarningEvent = new EventEntity('low_stock_warning', machineId);
      this.messageEmitterRepository.publish(lowStockWarningEvent);

      // Update the machine's state
      machine.lowStockWarningSent = true;
    }
  }
}
