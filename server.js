const net = require('net');
const Room = require('./room');
const Client = require('./client')

const room = new Room;

server = net.createServer( client => {

  // let client = new Client; //Preliminary code to allow sockets to be a class managed by an external file.

  //This block sets initial preferences for each user.
  client.name = 'user-' + Math.ceil(Math.random() * 100);
  client.message = '';
  client.setEncoding('utf-8');
  room.add(client);

  client.write('Welcome to CharlesChat, ' + client.name + '\n');

  client.on('data', data => {
    client.message += data;
    //Here, I'm accounting for Windows' peculiar handling of the 'data' event.
    if (data.indexOf('\r\n') !== -1) {
      room.send(client, client.message);
    //Since I've had to use this unusual method to aggregate the message string, I have to manually reset it.
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
