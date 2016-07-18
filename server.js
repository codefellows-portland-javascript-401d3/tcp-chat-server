const net = require('net');

let id = 1;
const clients = [];

const server = net.createServer(client =>{
  clients.push(client);
  client.name = `guest ${id++}`;
  client.setEncoding( 'utf-8' );

  client.write(`Welcome to the chat session ${client.name}!\n`);

  console.log(`${client.name} joined the chat session`);

  client.on('data', message=>{
    clients.forEach(c=>{
      //if(c === client) return;
      c.write(`${client.name}: ${message}\n`);
    });
  });

  client.on('close', ()=>{
    const index = clients.indexOf(client);
    if ( index !== -1 ) clients.splice( index, 1 );
    console.log(`${client.name} left the chat session`);
  });

});

server.listen(65000, ()=>{
  console.log('Server started on port', server.address().port);
});
