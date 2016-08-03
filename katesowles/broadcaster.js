const server = require('./server');

function broadcast (from, message) {
  if (server.clients.length === 0) {
    process.stdout.write('everyone left the chat');
    return;
  }
  server.clients.forEach(function(client) {
    if (client.name === from) return;
    client.write(message);
  });
}

exports.broadcast = broadcast;
