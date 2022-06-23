const createBody = (message) => `<html><body><h1>${message}</h1></body></html>`;
const createResponse = (body) => `HTTP/1.1 200 ok\r\n\r\n${body}\r\n`;

const parseRequestLine = (line) => {
  const [verb, uri, httpVersion] = line.split(' ');
  return { verb, uri, httpVersion };
};

const parseHeader = (line) => {
  const indexOfSeperator = line.indexOf(':');
  const key = line.slice(0, indexOfSeperator).trim().toLowerCase();
  const value = line.slice(indexOfSeperator + 1).trim();
  return [key, value];
};

const parseHeaders = (lines) => {
  let index = 0;
  const headers = {};
  while (index < lines.length && lines[index].length > 0) {
    const [key, value] = parseHeader(lines[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = {
  createBody,
  createResponse,
  parseRequestLine,
  parseHeaders,
  parseHeader,
  parseRequest
};
