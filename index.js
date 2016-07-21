const server = require('./server');
const port = process.argv[2] || 8888;

server.listen(port, () => {
  let address = server.address();
  console.log('Server up! Listening on', address, '.');
});
