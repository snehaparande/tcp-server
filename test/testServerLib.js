const assert = require('assert');
const { createBody } = require('../src/handler.js');
const {
  parseRequestLine,
  parseHeader,
  parseHeaders,
  parseRequest
} = require('../src/parser.js');

describe('CreateBody', () => {
  it('Should give the message in heading1 in html', () => {
    assert.strictEqual(createBody('hello'),
      '<html><body><h1>hello</h1></body></html>');

    assert.strictEqual(createBody('bye'),
      '<html><body><h1>bye</h1></body></html>');
  });

});

describe('parseRequestLine', () => {
  it('Should parse the request line and return an object', () => {
    assert.deepStrictEqual(parseRequestLine('HEAD / HTTP/1.1'), {
      verb: 'HEAD',
      uri: '/',
      httpVersion: 'HTTP/1.1'
    });
  });

});

describe('parseHeader', () => {
  it('should parse header', () => {
    assert.deepStrictEqual(parseHeader('host: localhost'), [
      'host',
      'localhost'
    ]);
  });

  it('should parser the header in lowercase', () => {
    assert.deepStrictEqual(parseHeader('Host: localhost'), [
      'host',
      'localhost'
    ]);
  });

  it('should parse header when multiple \':\' are present in value', () => {
    assert.deepStrictEqual(parseHeader('Host: localhost:8008'), [
      'host',
      'localhost:8008'
    ]);
  });

});

describe('parseHeaders', () => {
  it('Should parse the headers', () => {
    const headers = ['Host: localhost:8008',
      'Accept: */*'
    ];
    assert.deepStrictEqual(parseHeaders(headers), {
      host: 'localhost:8008',
      accept: '*/*'
    });
  });

  it('Should parse the headers when content is present', () => {
    const headers = ['Host: localhost:8008',
      'Accept: */*',
      '',
      'content'
    ];
    assert.deepStrictEqual(parseHeaders(headers), {
      host: 'localhost:8008',
      accept: '*/*'
    });
  });

  it('Should return empty object when no headers are present', () => {
    assert.deepStrictEqual(parseHeaders([]), {});
  });

});

describe('parseRequest', () => {
  it('Should parse the given request', () => {
    const request = 'GET / HTTP/1.1\r\nHost: localhost:8008\r\nUser-Agent: curl/7.64.1\r\nAccept: */*\r\n\r\n';
    const expected = {
      verb: 'GET',
      uri: '/',
      httpVersion: 'HTTP/1.1',
      headers: {
        host: 'localhost:8008',
        'user-agent': 'curl/7.64.1',
        accept: '*/*'
      }
    };
    assert.deepStrictEqual(parseRequest(request), expected);
  });

});
