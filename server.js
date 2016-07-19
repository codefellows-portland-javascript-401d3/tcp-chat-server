const net = require('net');
const ChatSession = require('./chatSession');

const chatSession = new ChatSession();

const server = net.createServer(client =>{
  chatSession.name(client);
  chatSession.add(client);

  client.setEncoding( 'utf-8' );

  client.write(`Welcome to the chat session ${client.name}!\nTo change your usnername type "newname [newnamehere]"\n`);

  client.on('data', message=>{
    if(message.match(/newname/)){
      chatSession.rename(client, message);
    } else {
      chatSession.message(client, message);
    }

  });

  client.on('close', ()=>{
    chatSession.remove(client);
  });

});

server.listen(65000, ()=>{
  console.log('Server started on port', server.address().port);
});
