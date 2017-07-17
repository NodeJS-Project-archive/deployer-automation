var express = require('express');
var app = require("./app.js");

var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8900

server.listen(port, () => {
    console.log("sever running on port " + port);
});

io.on('connection', function (socket) {
    console.log('new connection');

    socket.on('childProcess', function (nthng) {
        var files = ["commands.bat", "mongo.bat", "redis.bat", "rediscli.bat", "nodestart.bat"];
        const { spawn } = require('child_process');
     for (var i = 0; i < files.length; i++) {
        const bat = spawn('cmd.exe', ['/c', 'call ./cmd_files/'+files[i]]);
        bat.stdout.on('data', (data) => {
            console.log("logging"+data.toString());
            io.emit('commands', {
                message: "Stdout: " + data.toString()
            });
          
        });

        bat.stderr.on('data', (data) => {
            console.log("logging",data.toString());
            io.emit('commands', {
                message: "Stderr: " + data.toString()
            });
      
        });
     }

    });
});