class Client {
  constructor() {
    this.name = 'user-' + Math.ceil(Math.random() * 100);
    this.message = '';
    this.encoding = setEncoding('utf-8');
  }
}

module.exports = Client;
