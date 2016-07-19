

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
  send(data, client) {
    this.clients.forEach(c => {
      if ( c === client ) return;
      c.write(`${client.name} says: ${data}`); 
    });
  }
  changeName(data, client) {
    let newName = data.replace(`\\nick`, ``);
    client.name = newName;
    client.write(`Your new name is${client.name}`);
  }
};
  
  



