function ChatSession(){
  this.clients = new Array();
}

ChatSession.prototype.add = function(client){
  this.clients.push(client);
};

ChatSession.prototype.remove = function(client){
  const index = this.clients.indexOf(client);
  if ( index !== -1 ) this.clients.splice( index, 1 );
  console.log(`${client.name} left the chat session`);
};

ChatSession.prototype.message = function(client, message){
  this.clients.forEach(c=>{
    c.write(`${client.name}: ${message}\n`);
  });
};

module.exports = ChatSession;
