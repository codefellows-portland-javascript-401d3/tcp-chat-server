const assert = require('chai').assert;
const ChatSession = require('../chatSession');

describe('Chat Session Module Test', ()=>{
  const chatSession = new ChatSession();
  let testUser = {};
  testUser.name = 'guest 8675309';

  it('Creates a new chat session object', ()=>{
    assert.isOk(chatSession);
  });

  it('Adds a new client to the session', ()=>{
    chatSession.add(testUser);
    assert.equal(1, chatSession.clients.length);
  });

  it('Removes client from session', ()=>{
    chatSession.remove(testUser);
    assert.equal(0, chatSession.clients.length);
  });

});
