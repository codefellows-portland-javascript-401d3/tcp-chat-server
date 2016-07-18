const net = require('net');

let i = 0;

class Broadcast {
  constructor() {
    this.clients = [];
  }
  add(client) {
    this.clients.push(client);
  }
  remove(client) {
    const index = this.clients.indexOf(client);
    if(index !== -1) this.clients.splice(index, 1);
  }
  send(client, msg) {
    this.clients.forEach(c => {
      if(c === client) return;
      c.write(`${client.name} says: ${msg}`); 
    });
  }
}

const broadcast = new Broadcast();

const server = net.createServer(client => {
  broadcast.add(client);
  client.name = `name ${i++}`;
  client.setEncoding(`utf-8`);
  
  client.on(`data`, data => {
    broadcast.send(client, data);
  });
  
  client.on('close', () => {
    broadcast.remove(client);
  });
});



server.listen(65500, () => {
  address = server.address();
  console.log('opened server on', address);
});

