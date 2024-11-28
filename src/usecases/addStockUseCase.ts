import { EventEntity } from "src/domains/entities/eventEntity";
import { IMachineRepository } from "src/domains/repositories/IMachineRepository";
import { IMessageEmitterRepository } from "src/domains/repositories/IMessageEmitterRepository";

export class AddStockUseCase {
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
    const newStock = previousStock + quantity;

    console.log(`Adding ${quantity} to machine ${machineId}. Previous stock: ${previousStock}, New stock: ${newStock}`);
    this.machineRepository.updateStock(machineId, newStock);

    // Check for StockLevelOkEvent condition
    if (previousStock < 3 && newStock >= 3 && machine.lowStockWarningSent) {
      console.log(`Machine ${machineId}: Stock level OK. Publishing 'stock_level_ok' event.`);
      const stockLevelOkEvent = new EventEntity('stock_level_ok', machineId);
      this.messageEmitterRepository.publish(stockLevelOkEvent);

      // Reset the warning flag
      machine.lowStockWarningSent = false;
    }
  }
}
