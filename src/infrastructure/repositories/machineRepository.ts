import { MachineEntity } from "../../domains/entities/machineEntity";
import { IMachineRepository } from "../../domains/repositories/IMachineRepository";

export class MachineRepository implements IMachineRepository {
    private machines: Map<string, MachineEntity> = new Map();
  
    getMachine(id: string): MachineEntity | null {
      return this.machines.get(id) || null;
    }
  
    addMachine(machine: MachineEntity): void {
      this.machines.set(machine.id, machine);
    }
  
    updateStock(id: string, newStock: number): void {
      const machine = this.getMachine(id);
      if (machine) {
        machine.stock = newStock;
      }
    }
  }