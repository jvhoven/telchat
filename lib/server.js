'use strict';

let util = require('./util');
let data = require('./data');

// Inject commands into our data
data.init(util.loadCommands());

var Server = function(socket) {

    // Identify this client
    socket.identified = false;

    // Send a nice welcome message and announce
    socket.write("Welcome to " + process.env.SERVER_NAME + ", fill in your name. \n");

    // Handle incoming messages from clients.
    socket.on('data', function(msg) {
        var message = util.format(msg);

        // If the user is not identified yet, a name must be chosen
        if (!socket.identified) {
            if (util.usernameInUse(message)) {
                socket.write("> Sorry " + message + " is already taken \n" + "> Please try again. \n");
                return;
            } else {
                socket.name = message;
                socket.identified = true;
                socket.write("-> Nice to meet you " + socket.name + "!\n");
                util.broadcast(socket.name + " joined the chat\n", socket);

                // Put this new client in the list
                data.addClient(socket);
            }
        } else {
            if (util.isCommand(message)) {
                var args = message.split(" ");
                var cmd = data.commands[args[0].substring(1, message.length)];
                if(cmd != null) {
                    cmd.invoke(socket, args);
                } else {
                    socket.write("> Command not found.\n");
                }
            } else {
                util.broadcast(socket.name + "> " + message, socket);
            }
        }
    });

    // Remove the client from the list when it leaves
    socket.on('end', function() {
        data.removeClient(socket);
        util.broadcast(socket.name + " left the chat.\n");
    });
}

module.exports = Server;
