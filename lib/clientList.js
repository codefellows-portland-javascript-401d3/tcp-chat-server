exports = module.exports;

clients = [];

exports.init = (client,tempName) => {
  exports.add(client);

  client.write('\033[2JYou are now connected to Geoff\'s TCP server.\n');
  client.write('Hello, ' + tempName + '\n');
  client.write('What is your name? ');
};

exports.add = client => {
  clients.push(client);
};

exports.sendAll = (self, data) => {
  clients.forEach( client => {
    // Working on more robust output commands
    if (client === self) {
      client.write('\033[A\033[K' + data);
    } else {
      client.write(data);
    }
  });
};

exports.sendTo = (self,data) => {
  self.write(data);
}

exports.remove = client => {
  let i = clients.indexOf(client);
  clients.splice(i, 1);
}

exports.length = () => {
  return clients.length;
}