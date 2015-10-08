"use strict";

let data = require('./../lib/data');
let util = require('./../lib/util');

var kick = module.exports = {

    identifier: "kick",

    invoke: function() {
        let session = arguments[0];
        let args = arguments[1];
        let name = args[1];

        if (args.length > 2) {
            session.write("> Kick only takes one parameter <Client name>.\n");
            return;
        }

        if (name == session.name) {
            session.write("> Cannot kick yourself, silly.\n");
            return;
        } else {
            let client = data.getClientByName(name);
            if (client != null) {
                data.removeClient(client);
                util.broadcast(name + " was kicked by " + session.name + ".\n");
                client.write("You have been kicked from the server.\n")
                client.destroy();
            }
        }
    }
}
