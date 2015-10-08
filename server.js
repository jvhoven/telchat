'use strict';

let util = require('./util');

// Keep track of the chat clients
var clients = [];
var commands = [];

var Server = function(socket) {

    // Identify this client
    socket.identified = false;

    // Send a nice welcome message and announce
    socket.write("Welcome to " + process.env.SERVER_NAME + ", fill in your name. \n");

    // Handle incoming messages from clients.
    socket.on('data', function(data) {
        var message = util.format(data);
        if (!socket.identified) {
            if (util.usernameInUse(clients, message)) {
                socket.write("> Sorry " + message + " is already taken \n" + "> Please try again. \n");
                return;
            } else {
                socket.name = message;
                socket.identified = true;
                socket.write("-> Nice to meet you " + socket.name + "!\n");
                broadcast(socket.name + " joined the chat\n", socket);

                // Put this new client in the list
                clients.push(socket);
            }
        } else {
            if (util.isCommand(message)) {
                process.stdout.write("Is een command");
                /*commands.map(function(cmd) {

                });*/
            } else {
                broadcast(socket.name + "> " + data, socket);
            }
        }
    });

    // Remove the client from the list when it leaves
    socket.on('end', function() {
        clients.splice(clients.indexOf(socket), 1);
        broadcast(socket.name + " left the chat.\n");
    });

    // Send a message to all clients
    function broadcast(message, sender) {
        clients.forEach(function(client) {
            // Don't want to send it to sender
            if (client === sender) return;
            client.write(message);
        });
        // Log it to the server output too
        process.stdout.write(message)
    }
}

module.exports = Server;
