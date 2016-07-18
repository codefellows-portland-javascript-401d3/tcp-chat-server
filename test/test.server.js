const assert = require('chai').assert;
const ChatSession = require('../chatSession');

let testUser = {};
testUser.name = 'guest 8675309';

describe('Chat Session Module Test', ()=>{
  const chatSession = new ChatSession();

  it('Creates a new chat session object', ()=>{
    console.log(chatSession);
    assert.isOk(chatSession);
  });

  it('Adds a new client to the session', ()=>{
    chatSession.add(testUser);
    console.log(chatSession.clients);
    assert.equal(1, chatSession.clients.length);
  });

  it('Removes client from session', ()=>{
    chatSession.remove(testUser);
    console.log(chatSession.clients);
    assert.equal(0, chatSession.clients.length);
  });

});
