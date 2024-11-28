import { MachineEntity } from "src/domains/entities/machineEntity";
import { IMachineRepository } from "src/domains/repositories/IMachineRepository";

export class MachineRepository implements IMachineRepository {
  // Shared storage across all instances
  private static storage: Map<string, MachineEntity> = new Map();

  getMachine(id: string): MachineEntity | null {
    return MachineRepository.storage.get(id) || null;
  }

  addMachine(machine: MachineEntity): void {
    MachineRepository.storage.set(machine.id, machine);
  }

  updateStock(id: string, newStock: number): void {
    const machine = this.getMachine(id);
    if (machine) {
      machine.stock = newStock;
    }
  }
}
