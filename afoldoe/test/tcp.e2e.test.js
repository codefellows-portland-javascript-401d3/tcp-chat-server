const net = require('net');
const assert = require('chai').assert;
const tcp = require('../tcp');
const Broadcast = require('../broadcast');
const port = 65500;



describe(`chat functionality`, () => {
  before(done => {
    tcp.startServer();
    done();
  });

  describe(`clients successfully connect`, () => {
    let user1 = null;
    let user2 = null;
    before(done => {
      user1 = net.connect({port}, () => {
        user2 = net.connect({port}, () => {
          user2.setEncoding(`utf-8`);
          done();
        });
      });
    });
    it(`clients communicate successfully`, () => {
      user2.on(`data`, data => {
        assert.equal(data, `user1: Hello world`);
        done();
      });
      user1.write(`Hello world`);
    });
  });

  after(done => {
    
    done();
  });
});