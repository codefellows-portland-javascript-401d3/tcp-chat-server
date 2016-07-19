

module.exports = class Broadcast {
  constructor() {
    this.clients = [];
  }
  add(client) {
    this.clients.push(client);
    this.clients.forEach(c => {
      c.write(`${client.name} has joined the party! \n`);
    });
  }
  remove(client) {
    this.clients.forEach(c => {
      c.write(`${client.name} has left the party. \n`);
    });
    const index = this.clients.indexOf(client);
    if(index !== -1) this.clients.splice(index, 1);
  }
  send(data, client) {
    this.clients.forEach(c => {
      if ( c === client ) return;
      c.write(`${client.name} says: ${data}`); 
    });
  }
};
  
  



