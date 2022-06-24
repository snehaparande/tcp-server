const { createServer } = require('net');
const { parseRequest } = require('./src/parser');
const { requestHandler } = require('./src/handler.js');
const { serveFileContent } = require('./src/serveFileContent');

const startServer = (port) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      const request = parseRequest(chunk.toString());
      // requestHandler(request, socket);
      serveFileContent(request, socket);
    })
  });

  server.listen(port);
  console.log(`Listening at ${port}`);
};

startServer(8008);
