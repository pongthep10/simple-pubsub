import { MachineEntity } from "src/domains/entities/machineEntity";

export interface IMachineRepository {
  getMachine(id: string): MachineEntity | null;
  addMachine(machine: MachineEntity): void;
  updateStock(id: string, newStock: number): void;
}