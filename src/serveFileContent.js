const fs = require('fs');

const serveFileContent = ({ uri }, response) => {
  if (uri === '/') {
    uri += 'news.html'
  }
  const fileName = './public' + uri;
  if (!fs.existsSync(fileName)) {
    response.statusCode = 404;
    response.send('File Not Find');
    return;
  }
  const body = fs.readFileSync(fileName);
  response.send(body);
};

module.exports = { serveFileContent };
