const net = require('net');
const Room = require('./room');

const room = new Room;

server = net.createServer( client => {
  //Initialize Client (Should this be encapsulated above?)
  client.name = 'user-' + Math.ceil(Math.random() * 100);
  client.message = '';
  client.setEncoding('utf-8');
  room.add(client);

  //Welcome.
  client.write('Welcome to CharlesChat, ' + client.name + '\n');

  client.on('data', data => {
    //add current character to message string
    client.message += data;
    //Check whether they've entered CRLF and if so, publishToAll.
    if (data.indexOf('\r\n') !== -1) {
      room.send(client, client.message);
      //...and reset message string.
      client.message = '';
    }
  });

  client.on('close', () => {
    room.remove(client);
    room.clients.forEach(c => {
      room.send(c, `${client.name} has left the room.\r\n`);
    });
  });
});

module.exports = {room, server};
