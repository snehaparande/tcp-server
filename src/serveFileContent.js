const fs = require('fs');

const serveFileContent = ({ uri }, response) => {
  if (uri === '/') {
    uri += 'news.html'
  }
  const fileName = './public' + uri;
  if (!fs.existsSync(fileName)) {
    return false;
  }
  const body = fs.readFileSync(fileName);
  response.send(body);
  return true;
};

module.exports = { serveFileContent };
