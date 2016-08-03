const expect = require('chai').expect;
const server = require('../server');
const net = require('net');
const port = 60000;

describe('chat server', ()=>{

  before(done=>{
    server.listen(port, done);
  });

  describe('chat session', ()=>{
    let socket1;
    let socket2;

    before(done=>{
      socket1 = net.connect({port}, ()=>{
        socket2 = net.connect({port}, done);
        socket2.setEncoding( 'utf-8' );
        socket1.setEncoding( 'utf-8' );
      });
    });

    it('greets user when joining', done=>{
      socket2.on('data', message=>{
        expect(message).to.include('Welcome to the chat session');
        done();
      });
    });

    it('sockets send and receive messages', done=>{
      socket1.on('data', message=>{
        if(/^Welcome/.test(message) || /joined the chat/.test(message)) return;
        expect(message).to.include('hello there\n');
        done();
      });
      socket2.write('hello there');
    });


  });

  after(done=>{
    server.close();
    done();
  });

});
