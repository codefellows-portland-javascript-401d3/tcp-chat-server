const server = require('./lib/server');

const port = 65000;

server.listen(port);

console.log('Started new server on ' + port);
