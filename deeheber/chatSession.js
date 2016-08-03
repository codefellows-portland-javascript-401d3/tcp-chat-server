function ChatSession(){
  this.clients = new Array();
}

ChatSession.prototype.name = function(client){
  client.name = 'guest ' + Math.floor(Math.random()*5000);
};

ChatSession.prototype.rename = function(client, message){
  const oldName = client.name;
  client.name = message.replace(/^\\nick /, '').trim();

  this.clients.forEach(c=>{
    if(c === client){
      c.write(`\nYou changed your from ${oldName} to ${client.name} \n`);
    } else {
      c.write(`\n${oldName} changed their name to ${client.name} \n`);
    }
  });

};

ChatSession.prototype.add = function(client){
  this.clients.push(client);

  this.clients.forEach(c=>{
    if(c === client){
      return;
    } else {
      c.write(`\n${client.name} joined the chat.\n`);
    }
  });

};

ChatSession.prototype.remove = function(client){
  const index = this.clients.indexOf(client);
  if ( index !== -1 ) this.clients.splice( index, 1 );

  this.clients.forEach(c=>{
    c.write(`${client.name} has left the chat session.\n`);
  });

};

ChatSession.prototype.message = function(client, message){
  this.clients.forEach(c=>{
    c.write(`${client.name}: ${message}\n`);
  });

};

module.exports = ChatSession;
