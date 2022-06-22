const { createServer } = require('net');

const createBody = (message) => `<html><body><h1>${message}</h1></body></html>`;
const createResponse = (html) => `HTTP/1.1 200 ok\r\n\r\n${html}\r\n`;

const server = createServer((socket) => {
  socket.on('data', (chunk) => {
    const body = createBody('Hello');
    const response = createResponse(body);
    socket.write(response);
    socket.end();
  })
});

server.listen(8008);
