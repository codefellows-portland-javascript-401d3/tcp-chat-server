const net = require('net');
const assert = require('chai').assert;
const tcp = require('../tcp');
const broadcast = require('../broadcast');

describe(' server', () => {
  it('starts the server', (done) => {
    tcp.startServer();
    
    done();
  });

});

describe('testing Broadcast', () => {
  it('test for new broadcast', () => {
    broadcast.createBroadcast();
  });
});
