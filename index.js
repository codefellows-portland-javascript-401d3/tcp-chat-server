const server = require('./server');

server.listen(65000, ()=>{
  console.log('Server started on port', server.address().port);
});
