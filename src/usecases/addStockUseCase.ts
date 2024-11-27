import { EventEntity } from "../domains/entities/eventEntity";
import { IMachineRepository } from "../domains/repositories/IMachineRepository";
import { IMessageEmitterRepository } from "../domains/repositories/IMessageEmitterRepository";

export class AddStockUseCase {
  constructor(
    private machineRepository: IMachineRepository,
    private messageEmitterRepository: IMessageEmitterRepository
  ) {}

  execute(machineId: string, quantity: number): void {
    const machine = this.machineRepository.getMachine(machineId);
    if (!machine) throw new Error(`Machine ${machineId} not found`);

    const newStock = machine.stock + quantity;
    this.machineRepository.updateStock(machineId, newStock);

    if (machine.stock < 3 && newStock >= 3 && machine.lowStockWarningSent) {
      // Generate and publish StockLevelOkEvent
      const stockLevelOkEvent = new EventEntity('stock_level_ok', machineId);
      this.messageEmitterRepository.publish(stockLevelOkEvent);

      // Update the machine's state
      machine.lowStockWarningSent = false;
    }
  }
}
