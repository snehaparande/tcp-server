const { createServer } = require('net');
const { parseRequest } = require('./src/parser.js');
const { requestHandler } = require('./src/handler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { Response } = require('./src/response.js');

const createHandler = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

const startServer = (port, handle) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      const response = new Response(socket);
      const request = parseRequest(chunk.toString());
      handle(request, response);
    })
  });

  server.listen(port);
  console.log(`Listening at ${port}`);
};

const pageNotFound = ({ uri }, response) => {
  response.statusCode = 404;
  response.send('Page Not Find');
  return true;
};

const handlers = [requestHandler, serveFileContent, pageNotFound];
const handle = createHandler(handlers);
startServer(8008, handle);
