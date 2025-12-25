import http from 'http';
const hostname = 'localhost';
const port = 3003;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`User Server running at http://${hostname}:${port}/`);
});