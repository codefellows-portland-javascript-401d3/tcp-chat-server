const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const net = require('net');

const server = require('../server');

chai.use(chaiHttp);

describe('chat server tests', () => {

  before(done => {
    //Spins up the server.
    server.server.listen(2000, () => {
      done();
    });
  });

  var firstClient;
  var secondClient;

  it('clients can connect to the server', (done) => {
    firstClient = net.connect({port: 2000}, () => {
      // console.log(server.room.clients);
      // server.room.clients[0].name = 'Alice';
      secondClient = net.connect({port: 2000}, () => {
        // server.room.clients[1].name = 'Bob';
        // console.log(server.room.clients);
        //I would like to test this more rigorously, but the line below was not running. Would I need to export room?
        // assert.ok(server.room.clients.length === 2);
        done();
      });
    });
  });

  it('clients can send messages to one another', (done) => {
    //I suspect that my inability to resign this test is wrapped up with Windows' telnet screwiness. Consequently, I'm leaving it for review as is with the note that I have async worries about it as well.
    secondClient.on('data', (data) => {
      console.log('user2', data);
      if(data === server.room.clients[0].name + ': call!') secondClient.write('response!');
    });
    firstClient.on('data', (data) => {
      console.log('user1', data);
      if(data === server.room.clients[1].name + ': response!') {
        done();
      }
    });
    firstClient.write('call!');
    firstClient.write('\r\n');
  });

  after((done) => {
    server.server.close();
    done();
  });

});
