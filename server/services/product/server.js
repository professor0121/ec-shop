import http from 'http';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import {connectRabbitMQ} from "./src/config/rabbitmq.js";
import { consumeProductEvents } from './src/events/consumers/product.consumer.js';
const hostname = 'localhost';
const port = 3002;

async function startServer() {
  const server = http.createServer(app);
  await connectDB();
  await connectRabbitMQ();
  await consumeProductEvents();
  server.listen(port, hostname, () => {
    console.log(`Product Server running at http://${hostname}:${port}/`);
  });
}

startServer();