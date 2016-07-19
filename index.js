const net = require('net');
const clientList = require('./lib/clientList');

const server = net.createServer( socket => {
  console.log('Socket Connected!');
  socket.setEncoding('utf8');

  clientList.init(socket);

  socket.on('data', data => {
    clientList.send(socket,data); 
  });

  socket.on('close', () => {
    clientList.remove(socket);
    console.log('Socket closed.');
  });
});

server.listen(65000, () => {
  address = server.address();
  console.log('Started new server on', address);
});