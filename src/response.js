const EOF = '\r\n';

class Response {
  #socket
  #status
  constructor(socket) {
    this.#socket = socket;
    this.#status = 200;
  }

  set statusCode(responseStatus) {
    this.#status = responseStatus;
  }

  statusLine() {
    return `HTTP/1.1 ${this.#status} OK${EOF}`;
  }

  send(body) {
    this.#socket.write(this.statusLine());
    this.#socket.write(EOF);
    this.#socket.write(body);
    this.#socket.end();
  }
}

module.exports = { Response };
