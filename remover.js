const server = require('./server');

function remove (client) {
  server.clients.splice(server.clients.indexOf(client.name), 1);
}

exports.remove = remove;
