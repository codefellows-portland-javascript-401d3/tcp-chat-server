const net = require('net');
const server = require('../server');
const clients = require('../server').clients;
const remove = require('../remover').remove;
const assert = require('chai').assert;

let fauxClients = [];

fauxClients[0] = {name:'aaron'};
fauxClients[1] = {name:'ariel'};
fauxClients[2] = {name:'charles'};
fauxClients[3] = {name:'danielle'};
fauxClients[4] = {name:'david'};
fauxClients[5] = {name:'geoff'};
fauxClients[6] = {name:'kate'};
fauxClients[7] = {name:'marty'};

describe('gotta test \'em all', () => {
  it ('no users at start of server', () => {
    assert.equal(server.clients.length, 0, 'server must be running for this test to work properly');
  });

  it ('test remove function', () => {
    const collection = fauxClients;
    const userToFind = 'geoff';
    const before = fauxClients.length;
    remove(userToFind, collection);
    const after = fauxClients.length;

    assert.isBelow(after, before, 'remove function didn\'t work properly');
  });

  it('data is received', done => {
    var client = net.connect({port: 65000}, () => {
      client.write('hello?\n');
      client.write('is this thing on?\n');
    });

    client.on('data', data => {
      assert.ok(data);
      client.end();
      done();
    });
  });

  it('test live connect & disconnect from new client', done => {
    var client = net.connect({port: 65000});

    client.on('data', data => {
      assert.include(data.toString(), 'welcome ');
      client.end();
      done();
    });
  });

  it('data received even when multiple clients connected?', done => {
    const client1 = net.connect({port:65000});
    client1.on('data', data => {
      console.log(`client1 is connected, ${data}`);
      assert.include(data.toString(), 'welcome ');
      client1.end();
    });

    const client2 = net.connect({port:65000});
    client2.on('data', data => {
      console.log(`client2 is connected, ${data}`);
      assert.include(data.toString(), 'welcome ');
      client2.end();
    });

    const client3 = net.connect({port:65000});
    client3.on('data', data => {
      console.log(`client3 is connected, ${data}`);
      assert.include(data.toString(), 'welcome ');
      client3.end();
    });
    done();
  });
});
