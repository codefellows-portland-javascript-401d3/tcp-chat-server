const net = require('net');

class Room {
  constructor() {
    this.clients = [];
  }

  add(client) {
    this.clients.push(client);
  }

  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }

  send( client, message ) {
    this.clients.forEach( c => {
			// if ( c === client ) return; //Currently, we don't want this on.
      c.write( `${client.name} : ${message}` );
    });
    process.stdout.write(message);
  }
}

const room = new Room;

const server = net.createServer( client => {
  client.name = 'user-' + Math.ceil(Math.random() * 100);
  client.message = '';
  client.setEncoding('utf-8');
  client.write('Welcome to CharlesChat, ' + client.name + '\n');

  client.on('data', data => {
    //add current character to message string
    client.message += data;
    //Check whether they've entered CRLF and if so, publishToAll.
    if (data === '\r\n') {
      console.log('Sending.');
      room.send(client, client.name + ':' + client.message);
      //...and reset message string.
      client.message = '';
    }
  });

  client.on('close', () => {
    room.remove(client);
  });
});
