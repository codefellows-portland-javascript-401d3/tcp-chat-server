const net = require('net');

const server = new.createServer(socket => {
  consle.log('Hello form the server');
});

server.on('close', () => {
  console.log('Server closed!');
});

server.listen(65000, () => {
  address = server.address();
  console.log('opened server on', address);
});

