import http from 'http';
import app from './src/app.js';

const hostname = 'localhost';
const port = 3001;

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Auth Server running at http://${hostname}:${port}/`);
});