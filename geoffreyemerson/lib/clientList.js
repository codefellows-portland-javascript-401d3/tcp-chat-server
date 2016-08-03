exports = module.exports;

clients = [];

exports.init = (client) => {
  const name = 'guest-' + new Date().getTime();
  clients.push({client,name});
  client.write('\x1b[2JYou are now connected to Geoff\'s TCP server.\n');
  client.write('Hello, ' + exports.clientName(client) + '\n');
  client.write('To change your name, enter "\\nick yourName".\n');
};

exports.send = (self, data) => {
  if(data.indexOf('\\nick ') === 0) {
    const newName = stringCleaning(data);
    if (newName) {
      const message = exports.clientName(self) + ' has changed name to ' + newName + '\n';
      newClientName(self, newName); 
      broadcast(self, message);
    }
  } else {
    data = stringCleaning(data);
    broadcast(self, exports.clientName(self) + ' says: ' + data + '\n');
  };
};

exports.remove = client => {
  for (let index = 0; index < clients.length; index++) {
    if(clients[index].client === client) return clients.splice(index, 1);
  };  
};

exports.length = () => {
  return clients.length;
};

function broadcast(self, message) {
  clients.forEach( clientObj => {
    if (clientObj.client === self) {
      clientObj.client.write('\x1b[A\x1b[K' + message);
    } else {
      clientObj.client.write(message);
    }
  });
};

function stringCleaning(input) {
  // remove any unwanted chars here
  return input.replace(/^\\nick /,'').replace(/[\r|\n]/g,'')
};

exports.clientName = client => {
  for (let index = 0; index < clients.length; index++) {
    if(clients[index].client === client) return clients[index].name
  };
};

function newClientName(client,newName) {
  for (let index = 0; index < clients.length; index++) {
    if(clients[index].client === client) return clients[index].name = newName;
  };
}