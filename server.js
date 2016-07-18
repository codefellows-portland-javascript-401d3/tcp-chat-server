const net = require('net');
const ChatSession = require('./chatSession');

let id = 1;
const chatSession = new ChatSession();

const server = net.createServer(client =>{
  chatSession.add(client);

  client.name = `guest ${id++}`;
  client.setEncoding( 'utf-8' );

  client.write(`Welcome to the chat session ${client.name}!\n`);
  console.log(`${client.name} joined the chat session`);

  client.on('data', message=>{
    chatSession.message(client, message);
  });

  client.on('close', ()=>{
    chatSession.remove(client);
  });

});

server.listen(65000, ()=>{
  console.log('Server started on port', server.address().port);
});
