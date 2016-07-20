const net = require('net');
const assert = require('chai').assert;
const tcp = require('../tcp');
const Broadcast = require('../broadcast');

const client = 'Arielle';
const data = `Hello!`;
const nameData = `nick new-name`;
const newClient = {};
newClient.name = `Brian`;


describe(' server', () => {
  it('starts the server', (done) => {
    tcp.startServer();
    done();
  });

});

describe('testing Broadcast', () => {
  it('tests add method', () => {
    let b = new Broadcast();
    b.add(client);
    assert.deepEqual(b.clients, ['Arielle']);
  });

  it('tests remove method', () => {
    let b = new Broadcast();
    b.add(client);
    b.remove(client);
    assert.deepEqual(b.clients, []);
  });

  

});
