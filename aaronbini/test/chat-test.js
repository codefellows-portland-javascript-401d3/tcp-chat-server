const assert = require('chai').assert;
const ChatBroadcast = require('../lib/chat');
const EventEmitter = require('events');
const sillyName = require('sillyname');

const chat = new ChatBroadcast();

describe('ChatBroadcast Module', () => {

  class MockClient extends EventEmitter {
    write (message) {
      this.message = message;
    }
  }

  it('adds users and gives user nickname', () => {

    assert.ok(!chat.clients.length);

    const mocker1 = new MockClient();

    chat.add(mocker1);

    assert.ok(chat.clients.length > 0);
    assert.ok(chat.clients[0].name);

  });

  it('changes users nicknames', () => {
    let oldName = chat.clients[0].name;
    chat.changeNickname(chat.clients[0], '/nick Aaron..');
    assert.notDeepEqual(oldName, chat.clients[0].name);
  });

  it('welcomes new user with message', () => {
    const mocker2 = new MockClient();
    chat.add(mocker2);
    chat.welcome(mocker2, 'test string');
    const welcomeString = `Thanks for joining our chat!\nThere are ${chat.clients.length} user(s) in our chatroom! test string\nTo change your nickname (not really sure why you\'d want to?), enter /nick followed by your preferred nickname.\nEnter Text Below\n`;
    assert.deepEqual(mocker2.message, welcomeString);
  });

  it('allows communication between users', () => {
    const mocker3 = new MockClient();
    const mocker4 = new MockClient();
    chat.add(mocker3);
    chat.add(mocker4);
    chat.communicate(mocker3, 'Hello All');
    assert.deepEqual('You wrote: Hello All', mocker3.message);
    assert.deepEqual(`${mocker3.name}: Hello All`, mocker4.message);
  });

  it('removes users', () => {
    assert.deepEqual(chat.clients.length, 4);
    chat.remove(chat.clients[1]);
    assert.notDeepEqual(chat.clients.length, 4);
  });
  
});
