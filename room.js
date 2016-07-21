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
      c.write( `${client.name} : ${message} \r\n` );
    });
    process.stdout.write(message);
  }
}

module.exports = Room;
