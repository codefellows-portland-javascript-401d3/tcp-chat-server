const net = require('net');
const ChatSession = require('./chatSession');

const chatSession = new ChatSession();

const server = net.createServer(client =>{
  chatSession.name(client);
  chatSession.add(client);

  client.setEncoding( 'utf-8' );

  client.write(`Welcome to the chat session ${client.name}!\n`);

  client.on('data', message=>{
    //if the message contains \nick new-name
      //create a new nick name
      //broadcast to everyone that [old name] is now [new name]
    chatSession.message(client, message);

  });

  client.on('close', ()=>{
    chatSession.remove(client);
  });

});

server.listen(65000, ()=>{
  console.log('Server started on port', server.address().port);
});
