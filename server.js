const { createServer } = require('net');
const { parseRequest } = require('./src/parser.js');
const { requestHandler } = require('./src/handler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { Response } = require('./src/response.js');

const createHandler = (handlers) => {
  return (request, response, serverPath) => {
    for (const handler of handlers) {
      if (handler(request, response, serverPath)) {
        return true;
      }
    }
    return false;
  };
};

const pageNotFound = ({ uri }, response) => {
  response.statusCode = 404;
  response.send('Page Not Find');
  return true;
};

const createViewCounter = () => {
  let totalViews = 0;
  return ({ uri }, response) => {
    totalViews++;
    if (uri === '/count') {
      response.send(`Total views are: ${totalViews}`);
      return true;
    }
    return false;
  };
};


const startServer = (port, handle, serverPath) => {
  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      const response = new Response(socket);
      const request = parseRequest(chunk.toString());
      handle(request, response, serverPath);
    })
  });

  server.listen(port);
  console.log(`Listening at ${port}`);
};

const main = (serverPath) => {
  const handlers = [
    createViewCounter(),
    requestHandler,
    serveFileContent,
    pageNotFound
  ];
  const handler = createHandler(handlers);
  startServer(8008, handler, serverPath);
};

main(process.argv[2]);
