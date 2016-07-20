const net = require('net');
const ChatSession = require('./chatSession');

const chatSession = new ChatSession();

const server = net.createServer(client =>{
  chatSession.name(client);
  chatSession.add(client);

  client.setEncoding( 'utf-8' );

  client.write(`Welcome to the chat session ${client.name}! To change your usnername type "\\nick [newnamehere]" \n`);

  client.on('data', message=>{
    if(/^\\nick /.test(message)){
      chatSession.rename(client, message);
    } else {
      chatSession.message(client, message);
    }

  });

  client.on('close', ()=>{
    chatSession.remove(client);
  });

});

module.exports = server;
