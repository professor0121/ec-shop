import http from 'http';
import app from './src/app.js';
import {connectDB} from './src/config/db.js';
const hostname = 'localhost';
const port = 3005;


async function startServer() {
  const server = http.createServer(app);
  await connectDB();
  server.listen(port, hostname, () => {
    console.log(`Media Server running at http://${hostname}:${port}/`);
  });
}

startServer();