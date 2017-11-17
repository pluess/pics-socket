var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { origins: '*:*' });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log('chat message: ' + msg);
    });
    socket.on('pics message', function (msg) {
        io.emit('pics message', msg);
        console.log('pics message: ' + msg);
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});