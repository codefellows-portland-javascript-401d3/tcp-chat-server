const net = require('net');
const server = require('../lib/server');
const clientList = require('../lib/clientList');
const app = require('../index.js');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const port = 65000;

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



describe('api server', () => {

	const request = chai.request(app);

  before(done => {
		server.listen(port, done);
  });
  
  describe('client chats', () => {
		let client1 = null;
		let client2 = null;

		before(done => {
			client1 = net.connect({ port }, () => {
				client2 = net.connect({ port }, done);
				client2.setEncoding('utf-8');
			});
		});

		it('sends and recieves messages', done => {
			client2.on('data', data => {
				if(data === 'hello client 2') return;
				assert.include(data, 'connected');
				done();
			});
			client1.write('hello world');
		});
	});


	after(done => {
		server.close();
		done();
  });
});