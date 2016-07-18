const net = require('net');
const sillyName = require('sillyname');

let i = 0;

module.exports = class ChatBroadcast {

  constructor() {
    this.clients = [];
  }

  add (client) {
    let newClientname = this.giveNickname(client);
    this.clients.push(client);
    let currentUsers = this.listUsers();
    this.clients.forEach((c) => {
      if (client.id !== c.id) {
        c.write(`${newClientname} has joined our chat!\n`);
        c.write(`There are ${this.clients.length} user(s) in our chatroom! ${currentUsers}\n`);
      } else {
        this.welcome(c, currentUsers);
      }
    });
  }

  welcome (client, string) {
    let userString = string;
    client.write(`Thanks for joining our chat!\n`);
    client.write(`There are ${this.clients.length} user(s) in our chatroom! ${userString}\n`);
    client.write('To change your nickname (not really sure why you\'d want to?), enter /nick followed by your preferred nickname.\n');
    client.write(`Enter Text Below\n`);
  }

  listUsers () {
    let currentUsers = '';
    this.clients.forEach((c) => {
      currentUsers+=`${c.name}, `;
    });
    currentUsers = currentUsers.slice(0,-2) + '.';
    return currentUsers;

  }

  communicate (client, data) {
    this.clients.forEach(c => {
      if (c === client) {
        c.write(`You wrote: ${data}`);
      } else {
        c.write(`${client.name}: ${data}`);
      }
    });
    console.log(`Message from ${client.name}`);
  }

  giveNickname (client) {
    client.name = sillyName();
    client.id = i++;
    return client.name;
  }

  changeNickname (client, data) {
    let oldName = client.name;
    let newName = data.split(' ').pop().slice(0,-2);
    this.clients.forEach((c) => {
      if (client.id === c.id) {
        c.name = newName;
        c.write(`Your new nickname is ${c.name}, sorry you didn't like the one I gave you.\n`);
      } else {
        c.write(`${oldName} changed his/her name to ${newName}.\n`);
      }
    });
  }

  remove (client) {
    let leaving = client.name;
    console.log(`client ${leaving} closed`);
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
    this.clients.forEach((c, i) => {
      c.write(`${leaving} has left our chat room, it appears that your banter was not interesting enough.\n`);
    });
  }

};
