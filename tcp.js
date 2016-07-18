exports = module.exports;
const net = require('net');
const broadcast = require('./broadcast');

let i = 0;


function startServer() {
  const server = net.createServer(client => {
    client.name = `Guest: ${i++}`;
    client.setEncoding(`utf-8`);

    broadcast.createBroadcast();

    b.add(client);

    client.on(`data`, data => {
      b.send(client, data);
    });

    client.on('close', () => {
      b.remove(client);
    });
  });
  
  server.listen(65500, () => {
    address = server.address();
    console.log('opened server on', address);
  });
};
startServer();

exports.startServer = startServer;