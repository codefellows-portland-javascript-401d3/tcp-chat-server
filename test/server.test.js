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

  it ('test remove function', () => {
    const collection = fauxClients;
    const userToFind = 'geoff';
    const before = fauxClients.length;
    remove(userToFind, collection);
    const after = fauxClients.length;

    assert.isBelow(after, before, 'remove function didn\'t work properly');
  });
});
