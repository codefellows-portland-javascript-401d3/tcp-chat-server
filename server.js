// test clients using telnet command
// manage users upon connection and close
// broadcast messages to all other clients
// modularize!!!
// test with chai

const net = require('net');
const username = require('./username').generate;
const broadcaster = require('./broadcaster');
const remover = require('./remover');

const server = {};

// const client = {};
const clients = [];

server.start = net.createServer(client => {
  client.name = username.generate();
  const name = client.name;

  clients.push(client);

  client.write(`welcome ${name}\n`);

  broadcaster.broadcast(name, `${name} joined this chat \n`);

  client.on('data', data => {
    let message = `${name}: ${data.toString()}`;
    broadcaster.broadcast(name, message);
    process.stdout.write(message);
  });

  client.on('end', () => {
    let message = `${name} has left this chat \n`;
    remover.remove(name);
    process.stdout.write(message);
    broadcaster.broadcast(name, message);
  });

  client.on('error', error => {
    console.log(`ERROR: ${error.message}`);
  });
});

server.start.on('error', error => {
  console.log(`ERROR: ${error.message}`);
});

server.start.listen(65000, () => {
  let address = server.start.address();
  console.log(`opened server on ${address}`);
});

exports.start = server.start;
