const server = require('../server');
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

  it ('gives each user a name', () => {
    for (let i = 0; i < server.clients.length; i++) {
      assert.ok(server.clients[i].name);
      // not sure why I can't control this text enough to make it fail...
    }
  });

  it ('test remove function', () => {
    const collection = fauxClients;
    const userIndex = fauxClients[5].name;
    const userToFind = 'geoff';
    console.log('userToFind: ', userToFind);
    console.log('userIndex : ', userIndex);
    const before = fauxClients.length;
    console.log('before:\n', fauxClients, before);
    remove(userToFind, collection);
    const after = fauxClients.length;
    console.log('after:\n', fauxClients, after);

    assert.isBelow(after, before, 'remove function didn\'t work properly');
  });
});
