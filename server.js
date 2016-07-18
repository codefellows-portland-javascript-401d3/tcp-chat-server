const net = require('net');

let id = 1;
const clients = [];

const server = net.createServer(client =>{
  clients.push(client);
  client.name = `guest ${id++}`;

  client.write(`Hello from the server ${client.name}`);

  console.log(`${client.name} joined`);

  client.on('close', ()=>{
    const index = clients.indexOf(client);
    if ( index !== -1 ) clients.splice( index, 1 );
    console.log(`${client.name} left`);
  });

});

server.listen(65000, ()=>{
  console.log('Server started on port', server.address().port);
});
