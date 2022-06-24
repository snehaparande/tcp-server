const { createServer } = require('net');
const { requestHandler } = require('./src/handler.js');
const { parseRequest } = require('./src/parser');

const startServer = (port) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
      const request = parseRequest(chunk.toString());
      requestHandler(request, socket);

    })
  });

  server.listen(port);
  console.log(`Listening at ${port}`);
};

startServer(8008);
