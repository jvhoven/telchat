var utils = module.exports = {

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
    usernameInUse: function(clients, username) {
        var ret = false;

        if(clients.length > 0) {
            clients.map(function(client) {
                if(username.localeCompare(client.name) === 0) {
                    ret = true;
                }
            });
        }

        return ret;
    }

}
