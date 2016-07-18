

module.exports = class Broadcast {
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
};
  
  



