const net = require('net');

class ChatSession {
  constructor(){
    this.clients = [];
  }
  add(client){
    this.clients.push(client);
  }
  remove(client){
    const index = this.clients.indexOf(client);
    if ( index !== -1 ) this.clients.splice( index, 1 );
    console.log(`${client.name} left the chat session`);
  }
  message(client, message){
    this.clients.forEach(c=>{
      //if(c === client) return;
      c.write(`${client.name}: ${message}\n`);
    });
  }
}

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
