import { getChannel } from "../../config/rabbitmq.js";

export const publishProductCreated = async (product) => {
  const channel = getChannel();
  if (!channel) return;

  const queue = "PRODUCT_CREATED";
  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(product)),
    { persistent: true }
  );

  console.log("📤 PRODUCT_CREATED event published");
};

export const publishProductUpdated = async (product) => {
  const channel = getChannel();
  if (!channel) return;

  const queue = "PRODUCT_UPDATED";
  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(product)),
    { persistent: true }
  );

  console.log("📤 PRODUCT_UPDATED event published");
};

export const publishProductDeleted = async (productId) => {
  const channel = getChannel();
  if (!channel) return;
    const queue = "PRODUCT_DELETED";
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify({ id: productId })),
        { persistent: true }
    );

  console.log("📤 PRODUCT_DELETED event published");
};

export const publishProductStockUpdated = async (productId, stock) => {
  const channel = getChannel();
  if (!channel) return;

  const queue = "PRODUCT_STOCK_UPDATED";
  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify({ id: productId, stock })),
    { persistent: true }
  );

  console.log("📤 PRODUCT_STOCK_UPDATED event published");
};