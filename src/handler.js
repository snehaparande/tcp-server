const createBody = (message) => `<html><body><h1>${message}</h1></body></html>`;

const requestHandler = ({ uri }, response) => {
  if (uri === '/') {
    const body = createBody('Hello');
    response.send(body);
    return true;
  }
  if (uri === '/hello') {
    const body = createBody('How are you?');
    response.send(body);
    return true;
  }
  return false;
};

module.exports = { requestHandler, createBody };
