import { EventEntity } from "./domains/entities/eventEntity";
import { MachineEntity } from "./domains/entities/machineEntity";
import { PubSubFramework } from "./infrastructure/pubsub/pubsubFramework";
import { MachineRepository } from "./infrastructure/repositories/machineRepository";
import { MessageEmitterRepository } from "./infrastructure/repositories/messageEmitterRepository";
import { DependencyResolver } from "./adapters/dependencyResolver";
import { StockOkSubscriber } from "./infrastructure/pubsub/subscribers/stockOkSubscriber";
import { StockWarningSubscriber } from "./infrastructure/pubsub/subscribers/stockWarningSubscriber";

const randomMachine = (): string => {
    const random = Math.random() * 3;
    if (random < 1) return "001";
    else if (random < 2) return "002";
    return "003";
  };
  
  const eventGenerator = (): EventEntity => {
    const random = Math.random();
    if (random < 0.5) {
      const saleQty = Math.random() < 0.5 ? 1 : 2; // 1 or 2
      return new EventEntity("sale", randomMachine(), { quantity: saleQty });
    }
    const refillQty = Math.random() < 0.5 ? 3 : 5; // 3 or 5
    return new EventEntity("refill", randomMachine(), { quantity: refillQty });
  };

(async () => {
  // Initialize infrastructure
  const pubSub = new PubSubFramework();
  const machineRepository = new MachineRepository();
  const pubSubRepository = new MessageEmitterRepository(pubSub);

  // Add machines to repository
  machineRepository.addMachine(new MachineEntity("001", 10));
  machineRepository.addMachine(new MachineEntity("002", 10));
  machineRepository.addMachine(new MachineEntity("003", 10));

  // Initialize DependencyResolver
  const resolver = new DependencyResolver(machineRepository, pubSubRepository);

  // Register event subscribers
  const stockWarningSubscriber = new StockWarningSubscriber();
  const stockOkSubscriber = new StockOkSubscriber();

  pubSub.subscribe("low_stock_warning", stockWarningSubscriber); // Handle low stock warning
  pubSub.subscribe("stock_level_ok", stockOkSubscriber); // Handle stock level recovery

  // Generate and process random events
  const events: EventEntity[] = Array.from({ length: 10 }, () => eventGenerator()); // 10 random events

  console.log("Generated Events:");
  events.forEach(event => console.log(event));

  // Process each event
  console.log("\nProcessing Events:");
  events.forEach(event => resolver.resolveUseCase(event));

  console.log("\nFinal Machine States:");
  ["001", "002", "003"].forEach(machineId => {
    const machine = machineRepository.getMachine(machineId);
    if (machine) {
      console.log(`Machine ${machine.id}: Stock = ${machine.stock}, Low Stock Warning Sent = ${machine.lowStockWarningSent}`);
    }
  });
})();