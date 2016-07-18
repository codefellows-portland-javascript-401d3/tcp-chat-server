![cf](https://i.imgur.com/7v5ASc8.png) tcp-chat-server
======

Create a chat server that manages connecting clients and enables broadcasting of messages.

Use the `telnet` command to spin up clients to chat on your server.

## Directions

* Use the Node.js `net` module to create a chat server. 

* You can test clients connecting using `telnet` command:
	* https://procurity.wordpress.com/2013/07/15/beginners-guide-to-telnet-basics/

* Manage connected clients when they "register" (on server `connection` and socket `close`)

* Clients should be given a randomly generated `nickname` that used to identify who typed a message in the chat
 * **e.g.** `guest-43: hello everyone`
 
* When a client sends a message (on socket `data`) it should be "broadcast" to all other clients, including the
client who sent the message.

* Make sure the functionality that manages clients is encapsulated so that it interacts with the net server,
but is not coupled to it (Single Responsiblity Principal). There is no "one right way" to design this assignment, you
should spend some time trying different possibilities.
 
* Because we are covering creating clients until tomorrow, you won't be able to e2e test your server.

* **But** you still should unit test modules (another reason to decouple managing clients from the server) and for this assignment you  should us `chai` as your assertion library (you can choose either BDD or Assert api - just be consistent).

## Bonus

* **2pts** create an event that will rename a user when they type 
`\nick new-name` and broadcast to all users the updated name change.
 
## Rubruc

* Chats Correctly: 3pts
* Code Quality: 2pts
* Design: 3pts
* Tests: 2pts
