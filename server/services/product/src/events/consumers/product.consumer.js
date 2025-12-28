import { getChannel } from "../../config/rabbitmq.js";

export const consumeProductEvents = async () => {
  const channel = getChannel();
  if (!channel) return;

  const queue = "ORDER_PRODUCT_STOCK_UPDATE";
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    console.log("📥 Received stock update event", data);

    // future: update stock here

    channel.ack(msg);
  });
};
