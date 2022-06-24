const fs = require('fs');

const createResponse = (status, body) => `HTTP/1.1 ${status} ok\r\n\r\n${body}\r\n`;

const serveFileContent = ({ uri }, socket) => {
  if (uri === '/') {
    uri += 'news.html'
  }
  const fileName = './public' + uri;
  if (!fs.existsSync(fileName)) {
    const response = createResponse(404, 'File Not Found');
    socket.write(response);
    socket.end();
    return;
  }
  const body = fs.readFileSync(fileName);
  socket.write('HTTP/1.1 200 ok\r\n\r\n');
  socket.write(body);
  socket.write('\r\n');
  socket.end();
};

module.exports = { serveFileContent };
