exports = module.exports;
const net = require('net');
const Broadcast = require('./broadcast');


let i = 1;
let nick = /\\nick/;
const broadcast = new Broadcast();

function startServer() {
  const server = net.createServer(client => {
    
    client.name = `Guest: ${i++}`;
    client.setEncoding(`utf-8`);

    broadcast.add(client);
    client.write(`Enter \\nick + new username to change current username! \n`);

    client.on(`data`, data => {
      if(data.match(nick)) {
        broadcast.changeName(data, client);
      }
      broadcast.send(data, client);
    });

    client.on('close', () => {
      broadcast.remove(client);
    });
  });
  
  server.listen(65500, () => {
    address = server.address();
    console.log('opened server on', address);
  });
};

startServer();

exports.startServer = startServer;