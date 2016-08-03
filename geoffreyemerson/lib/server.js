const net = require('net');
const clientList = require('./clientList');

module.exports = net.createServer( socket => {
  // console.log('Socket Connected!');
  socket.setEncoding('utf8');

  clientList.init(socket);

  socket.on('data', data => {
    clientList.send(socket,data); 
  });

  socket.on('close', () => {
    clientList.remove(socket);
    // console.log('Socket closed.');
  });
});

