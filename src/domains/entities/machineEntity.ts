export class MachineEntity {
    constructor(public id: string, public stock: number, public lowStockWarningSent = false) {}
}