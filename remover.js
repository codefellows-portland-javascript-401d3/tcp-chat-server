const server = require('./server');

const remove = function (client) {
  server.clients.splice(server.clients.indexOf(client.name), 1);
};

exports.remove = remove;
