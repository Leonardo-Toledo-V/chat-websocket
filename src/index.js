const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app); // we need to link the http (Node) server to the express app (Socket.io) with a server
const io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000); // set our port, if not, we set it to 3000
require('./socket')(io); // require our socket.io connection

//static files
app.use(express.static(path.join(__dirname, 'public'))); //set the html file location

server.listen(app.get('port'), () => {
    console.log('Example app listening on port', app.get('port'));
}); //start the server and print the port