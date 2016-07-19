const net = require('net');
const clientList = require('./lib/clientList');

const server = net.createServer( socket => {
  console.log('Socket Connected!');
  socket.setEncoding('utf8');
  let tempName = 'guest-' + new Date().getTime();
  
  let clientName = '';
  clientList.init(socket, tempName);

  socket.on('data', data => {
    // Parse data to ignore null strings and unwanted characters.
    let input = data.toString().replace(/[\r\n]/g, ''); // potentially remove all unwanted values here
    
    if(!clientName) {
      // First entry is used as client's name
      if (input) {
        clientName = input;
        clientList.sendAll(socket, clientName + ' has joined.\n');
      } else {
        // Repeat name query if empty string was sent.
        clientList.sendTo(socket, 'What is your name? ');
      }
    } else {
      // Normal broadcast output
      if (input) clientList.sendAll(socket, clientName + ' says: ' + data); 
    }
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