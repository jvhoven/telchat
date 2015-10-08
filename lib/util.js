"use strict";

let fs = require("fs");
let data = require("./data");

var utils = module.exports = {

    /*
    * Loads all commands into an array so it can be accessed by its identifier
    *
    * @return array of commands
    */
    loadCommands: function() {
        let commands = fs.readdirSync('./commands');
        let cmdArray = {};

        if(commands.length > 0) {
            commands.forEach(function(command) {
                var moduleString = command.substring(0, command.length - 3);
                commands.push(moduleString);

                var cmd = require('./../commands/' + moduleString);
                cmdArray[cmd.identifier] = cmd;
            });
        }

        return cmdArray;
    },

    /*
    * Removes line breaks and other crazy stuff from the variable
    *
    * @var val The unformatted string
    */
    format: function(val) {
        return String(val).replace(/(\r\n|\n|\r)/gm,"");
    },

    /*
    * Returns wether a sent message contains a command
    *
    * @var message The formatted message
    */
    isCommand: function(message) {
        if(message.substring(0, 1) == ".") {
            return true;
        }
        return false;
    },

    /*
    * Checks if the username is already in use
    *
    * @var clients The list of clients in the current session
    * @var username The username to match
    */
    usernameInUse: function(username) {
        var ret = false;

        if(data.clients.length > 0) {
            data.clients.map(function(client) {
                if(username.localeCompare(client.name) === 0) {
                    ret = true;
                }
            });
        }

        return ret;
    },

    /*
    * Broadcast a message to all connected clients, except the sender
    *
    * @var message The message to be sent
    * @var sender The sender socket
    */
    broadcast: function(message, sender) {
        data.clients.forEach(function(client) {
            // Don't want to send it to sender
            if (client === sender) return;
            client.write(message);
        });

        // Log it to the server output too
        process.stdout.write(message)
    }
}
