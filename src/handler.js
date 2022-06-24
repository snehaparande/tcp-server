const createBody = (message) => `<html><body><h1>${message}</h1></body></html>`;

const requestHandler = ({ uri }, response) => {
  if (uri === '/') {
    const body = createBody('Hello');
    response.send(body);
    return;
  }
  if (uri === '/hello') {
    const body = createBody('How are you?');
    response.send(body);
    return;
  }
  response.statusCode = 404;
  response.send('Page Not Found');
};

module.exports = { requestHandler, createBody };
