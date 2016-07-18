module.exports = class ChatSession {
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
      c.write(`${client.name}: ${message}\n`);
    });
  }
};
