const chai = require('chai');
const assert = chai.assert;
const net = require('net');

const server = require('../server');
const port = 2500;

describe('server', () => {

  before(done => {
      server.server.listen(port, () => {
      done();
    });
  });

  var firstClient;
  var secondClient;

  before(done => {
    firstClient = net.connect({port}, () => {
      done();
    });
  });

  before(done => {
    secondClient = net.connect({port}, () => {
      done();
    });
  });

  it('clients can connect to the server', () => {
    assert.equal(server.room.clients.length, 2);
  });

  it('clients receive welcome message', (done) => {
    secondClient.once('data', (data) => {
      assert.equal(data.toString(), 'Welcome to CharlesChat, ' + server.room.clients[1].name + '\n');
      done();
    });
  });

  it('clients can send and receive messages', (done) => {
    firstClient.write('Hello, there!\r\n');
    secondClient.on('data', (data) => {
      assert.equal(data.toString(), server.room.clients[0].name + ' : Hello, there!\r\n \r\n');
      done();
    });
  });

  after((done) => {
    server.server.close();
    done();
  });
});
