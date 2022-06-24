const createBody = (message) => `<html><body><h1>${message}</h1></body></html>`;
const createResponse = (status, body) => `HTTP/1.1 ${status} ok\r\n\r\n${body}\r\n`;

const requestHandler = ({ uri }, socket) => {
  if (uri === '/') {
    const body = createBody('Hello');
    const response = createResponse(200, body);
    socket.write(response);
    socket.end();
    return;
  }
  const body = createBody('Page Not Found');
  const response = createResponse(404, body);
  socket.write(response);
  socket.end();
};

module.exports = { requestHandler, createBody, createResponse };
