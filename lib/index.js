// Load the TCP Library
net = require('net');
Server = require('./server');

// Load all commands
// Start a TCP Server
var server = net.createServer(Server);
server.listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
