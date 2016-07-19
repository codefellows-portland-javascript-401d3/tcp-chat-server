#A simple TCP Chat Server

##Codefellows 401d3

###Aaron Bini - 07/18/2016

Get a few users going to see functionality. When a new user enters, others are informed and their name is shown to the other users. Also the number of current users is displayed to all users when a new user enters. When a user changes their name, the other users are informed of the name change. When a user leaves, the other users are informed of the change. A user can only change their name if they follow proper command syntax. A welcome message is shown only to new users when they enter, which informs them how to change names, and lets them know who else is in the chat room.

Functionality is abstracted through the ChatBroadcast class in chat.js, and is exported as a module. chatServer.js is where the TCP connection is made, and this file imports the chat.js file for full chat functionality.
