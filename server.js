const { createServer } = require('net');
const { parseRequest } = require('./src/parser.js');
const { requestHandler } = require('./src/handler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { Response } = require('./src/response.js');

const startServer = (port) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      const response = new Response(socket);
      const request = parseRequest(chunk.toString());
      requestHandler(request, response);
      // serveFileContent(request, response);
    })
  });

  server.listen(port);
  console.log(`Listening at ${port}`);
};

startServer(8008);
