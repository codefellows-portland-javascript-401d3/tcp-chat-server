const assert = require('chai').assert;
const clientList = require('../lib/clientList');

describe('clientList chat library', () => {

  it('saves and removes an id/name pair', () => {
    const dummySocket = new Dummy();
    const length = clientList.length();
    clientList.init(dummySocket);
    assert.notEqual(length,clientList.length());
    clientList.remove(dummySocket);
    assert.equal(length,clientList.length());
  });

  it('writes messages to socket', () => {
    const dummySocket = new Dummy();
    clientList.init(dummySocket);
    clientList.send(dummySocket,'hello');
    assert.ok(dummySocket.message);
  });

  it('writes messages to other sockets', () => {
    const dummySocket1 = new Dummy();
    const dummySocket2 = new Dummy();
    clientList.init(dummySocket1);
    assert.notOk(dummySocket2.message);
    clientList.init(dummySocket2);
    dummySocket2.message = '';
    assert.notOk(dummySocket2.message);
    clientList.send(dummySocket1,'hello');
    assert.ok(dummySocket2.message);
  });

  it('changes client name upon request', () => {
    const dummySocket = new Dummy();
    clientList.init(dummySocket);
    const guestName = clientList.clientName(dummySocket);
    assert.equal(guestName,clientList.clientName(dummySocket));
    clientList.send(dummySocket,'\\nick Bob');
    assert.notEqual(guestName,clientList.clientName(dummySocket));
  });

});

class Dummy {
  write(msg) {
    this.message = msg;
  };
};