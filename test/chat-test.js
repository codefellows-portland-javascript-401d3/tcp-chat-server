const assert = require('chai').assert;
const ChatBroadcast = require('../chat');
const net = require('net');
const sillyName = require('sillyname');

const dummyData = [{}, {}, {}, {}];

const chat = new ChatBroadcast();

describe('ChatBroadcast Module', () => {
  it('adds users and gives user nickname', () => {
    chat.add(dummyData[0]);
    assert.ok(chat.clients.length > 0);
    assert.ok(chat.clients[0].name.length > 0);
  });

  it('welcomes users with list of current users', () => {
    //can only be tested when server is running
  });

  it('allows communication between users', () => {
    //can only be tested when server is running
  });

  it('changes users nicknames', () => {
    chat.add(dummyData[1]);
    let oldName = chat.clients[1].name;
    chat.changeNickname(chat.clients[1], '/nick Aaron..');
    assert.notDeepEqual(oldName, chat.clients[1].name);
  });

  it('removes users', () => {
    let userlength = chat.clients.length;
    chat.remove(chat.clients[1]);
    assert.notDeepEqual(userlength, chat.clients[1]);
  });

  after(() => {
    let i = 0;
  });
});
