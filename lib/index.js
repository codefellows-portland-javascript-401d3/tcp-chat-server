const server = require('./chatServer');
const port = 65000;

server.listen(port, () => {
  address = server.address();
  console.log('opened server on ', address);
});
