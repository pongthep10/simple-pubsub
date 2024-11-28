import { EventEntity } from "src/domains/entities/eventEntity";
import { IMachineRepository } from "src/domains/repositories/IMachineRepository";
import { IMessageEmitterRepository } from "src/domains/repositories/IMessageEmitterRepository";

export class ReduceStockUseCase {
  constructor(
    private readonly machineRepository: IMachineRepository,
    private readonly messageEmitterRepository: IMessageEmitterRepository
  ) {}

  execute(machineId: string, quantity: number): void {
    const machine = this.machineRepository.getMachine(machineId);

    if (!machine) {
      throw new Error(`Machine ${machineId} not found`);
    }

    const previousStock = machine.stock;
    const newStock = previousStock - quantity;

    console.log(`Reducing stock of machine ${machineId}. Previous stock: ${previousStock}, New stock: ${newStock}`);
    this.machineRepository.updateStock(machineId, newStock);

    // Check if a LowStockWarningEvent should be generated
    if (newStock < 3 && !machine.lowStockWarningSent) {
      console.log(`Machine ${machineId}: Low stock warning triggered.`);
      const lowStockWarningEvent = new EventEntity("low_stock_warning", machineId);
      this.messageEmitterRepository.publish(lowStockWarningEvent);

      // Update the warning state
      machine.lowStockWarningSent = true;
    }
  }
}
