export class EventEntity {
  constructor(
    public readonly topic: string, // e.g., 'sale', 'refill', 'low_stock_warning', etc.
    public readonly machineId: string,
    public readonly payload?: any // Optional additional data (e.g., quantity of stock)
  ) {}
}
