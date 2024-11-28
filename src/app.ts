import { EventEntity } from "src/domains/entities/eventEntity";
import { MachineEntity } from "src/domains/entities/machineEntity";
import { PubSubFramework } from "src/infrastructure/pubsub/pubsubFramework";
import { MachineRepository } from "src/infrastructure/repositories/machineRepository";
import { MessageEmitterRepository } from "src/infrastructure/repositories/messageEmitterRepository";
import { SaleEventProcessor } from "src/adapters/eventProcessors/saleEventProcessor";
import { RefillEventProcessor } from "src/adapters/eventProcessors/refillEventProcessor";
import { StockWarningEventProcessor } from "src/adapters/eventProcessors/stockWarningEventProcessor";
import { StockOkEventProcessor } from "src/adapters/eventProcessors/stockOkEventProcessor";
import { Subscriber } from "src/infrastructure/pubsub/subscriber";

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
  const messageEmitterRepository = new MessageEmitterRepository(pubSub);

  // Add machines to repository
  machineRepository.addMachine(new MachineEntity("001", 3));
  machineRepository.addMachine(new MachineEntity("002", 7));
  machineRepository.addMachine(new MachineEntity("003", 1));

  // Create processors for each topic
  const saleProcessor = new SaleEventProcessor();
  const refillProcessor = new RefillEventProcessor();
  const stockWarningProcessor = new StockWarningEventProcessor();
  const stockOkProcessor = new StockOkEventProcessor();

  // Create and register subscribers
  pubSub.subscribe("sale", new Subscriber("sale", saleProcessor));
  pubSub.subscribe("refill", new Subscriber("refill", refillProcessor));
  pubSub.subscribe("low_stock_warning", new Subscriber("low_stock_warning", stockWarningProcessor));
  pubSub.subscribe("stock_level_ok", new Subscriber("stock_level_ok", stockOkProcessor));

  // Generate and process random events
  const events: EventEntity[] = Array.from({ length: 10 }, () => eventGenerator());

  console.log("Generated Events:");
  events.forEach(event => console.log(event));

  // Publish each event
  console.log("\nPublishing Events:");
  events.forEach(event => {
    console.log(`Publishing event: ${event.topic} for machine ${event.machineId}`);
    pubSub.publish(event);
  });

  console.log("\nFinal Machine States:");
  ["001", "002", "003"].forEach(machineId => {
    const machine = machineRepository.getMachine(machineId);
    if (machine) {
      console.log(`Machine ${machine.id}: Stock = ${machine.stock}, Low Stock Warning Sent = ${machine.lowStockWarningSent}`);
    }
  });
})();
