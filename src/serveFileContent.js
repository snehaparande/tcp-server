const fs = require('fs');

const serveFileContent = ({ uri }, response, serverPath) => {
  if (uri === '/') {
    uri += 'news.html'
  }
  const fileName = serverPath + uri;
  if (!fs.existsSync(fileName)) {
    return false;
  }
  const body = fs.readFileSync(fileName);
  response.send(body);
  return true;
};

module.exports = { serveFileContent };
