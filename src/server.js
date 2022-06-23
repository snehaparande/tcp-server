const { createServer } = require('net');
const {
  createBody,
  createResponse,
  parseRequest
} = require('./serverLib');


const server = createServer((socket) => {
  socket.on('data', (chunk) => {
    console.log(chunk.toString());
    const request = parseRequest(chunk.toString());
    console.log(request);
    const body = createBody('Hello');
    const response = createResponse(body);
    socket.write(response);
    socket.end();
  })
});

server.listen(8008);
