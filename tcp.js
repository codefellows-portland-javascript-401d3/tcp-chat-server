exports = module.exports;
const net = require('net');
const Broadcast = require('./broadcast');

let i = 0;


function startServer() {
  const server = net.createServer(client => {
    client.name = `Guest: ${i++}`;
    client.setEncoding(`utf-8`);

    let b = new Broadcast();
    
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


exports.startServer = startServer;