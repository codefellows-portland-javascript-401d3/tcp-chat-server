const server = require('../lib/chatServer');
const net = require('net');
const assert = require('chai').assert;
const port = 65000;

describe('chat server', () => {

  before(done => {
    server.listen(port, done);
  });

  describe('client chats', () => {
    let client1 = null;
    let client2 = null;

    before(done => {
      client1 = net.connect({port}, () => {
        client1.setEncoding('utf-8');
        client2 = net.connect({port}, done);
        client2.setEncoding('utf-8');
      });
    });

    it('sends and receives messages', (done) => {
      client2.on('data', data => {
        assert.ok(data.length>0);
        client1.on('data', data2 => {
          assert.ok(data2.length>0);
        });
        done();
      });

    });
  });

  after(done => {
    server.close();
    done();
  });

});
