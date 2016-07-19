exports = module.exports;
const net = require('net');
const Broadcast = require('./broadcast');


let i = 1;
const broadcast = new Broadcast();

function startServer() {
  const server = net.createServer(client => {
    
    client.name = `Guest: ${i++}`;
    client.setEncoding(`utf-8`);

    broadcast.add(client);

    client.on(`data`, data => {
      broadcast.send(data, client);
    });

    client.on('close', () => {
      broadcast.remove(client);
      console.log('client removed');
    });
  });
  
  server.listen(65500, () => {
    address = server.address();
    console.log('opened server on', address);
  });
};

startServer();

exports.startServer = startServer;