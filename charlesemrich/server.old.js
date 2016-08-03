const net = require('net');

const clients = [];

const server = net.createServer( client => { //Would it be better to put lines 8-10 in an on.connect?

  //Initialize new client to server.
  clients.push(client);
  // client.name = client.remoteAddress + ':' + client.remotePort; //Not Random...
  client.name = 'user-' + Math.ceil(Math.random() * 100);
  client.message = '';
  client.setEncoding('utf-8');
  client.write('Welcome to CharlesChat, ' + client.name + '\n');
  //Log client name to admin console.
  client.on('connection', () => { //doesn't currently work. Why not?
    console.log(client.name);
  });
  //Handle incoming messages.
  client.on('data', data => {
    //add current character to message string
    client.message += data;
    //Check whether they've entered CRLF and if so, publishToAll.
    if (data === '\r\n') {
      console.log('Sending.');
      publishToAll(client, client.name + ':' + client.message);
      //...and reset message string.
      client.message = '';
    }
  });
  //Handle closing connections.
  client.on('close', () => {
    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);
    console.log('Client ${client.name} left. It\'s a little colder in here.\n');
  });
});

server.listen(8888, () => {
  address = server.address();
  console.log('Server up! On ', address, '!');
});

function publishToAll(sender, data) {
  clients.forEach(e => {
    //Avoid sending message to sender
    if (e === sender) return;
    //send to everyone else
    e.write(data);
  });
  //And log it to the terminal
  process.stdout.write(data);
}
