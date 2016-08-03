const ChatBroadcast = require('./chat');
const net = require('net');
const sillyName = require('sillyname');

const chat = new ChatBroadcast();

const server = net.createServer( client => {

  chat.add(client);
  console.log(`client ${client.name} connected`);

  client.setEncoding('utf8');

  client.on('data', data => {
    const nickChange = /^\/nick /;
    if (nickChange.test(data)) {
      chat.changeNickname(client, data);
    } else {chat.communicate(client, data);}
  });

  client.on('close', () => {
    chat.remove(client);
  });
});

module.exports = server;
