"use strict";

var data = module.exports = {
    clients: [],
    commands: null,

    /*
    * This function will load all the commands into the data structure
    *
    * @var commands The commands array created by the Util class
    */
    init: function(commands) {
        this.commands = commands;
    },

    /*
    * Remove a client once he quits
    *
    * @var socket The leaving client
    */
    removeClient: function(socket) {
        this.clients.splice(this.clients.indexOf(socket), 1);
    },

    /*
    * Add a client when he connects
    *
    * @var socket The entering client
    */
    addClient: function(socket) {
        this.clients.push(socket);
    },

    getClientByName: function(name) {
        let returnVal = null;

        this.clients.forEach(function(client) {
            if(client.name == name) {
                returnVal = client;
            }
        });
        return returnVal;
    }
}
