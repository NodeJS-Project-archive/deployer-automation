var express = require('express');
var app = require("./app.js");

var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8900
fs = require('fs');

server.listen(port, () => {
    console.log("sever running on port " + port);
});

io.on('connection', function (socket) {
    console.log('new connection');

    socket.on('childProcess', function (totalData) {
        console.log(totalData);
        var files = [];
        for (var i = 0; i < totalData.length; i++) {
            var commands = "";
            files.push(totalData[i].processName + '.bat');
            console.log("file " + totalData[i].processName + '.bat');
            for (var j = 0; j < totalData[i].commandsData.length; j++) {
                console.log(totalData[i].commandsData[j]);
                commands += totalData[i].commandsData[j] + "\n"
                //commands.push(totalData[i].commandsData[j]);
            }
            fs.writeFile('./cmd_files/' + totalData[i].processName + '.bat', commands, function (err) {
                if (err) return console.log(err);
                console.log("at file "+ '.bat');
            });

        }
          //var files = ["commands.bat", "mongo.bat", "redis.bat", "rediscli.bat", "nodestart.bat"];
        if (files.length != 0) {
            const { spawn } = require('child_process');
            console.log("files data" + files);
            for (var i = 0; i < files.length; i++) {
                console.log("inside spawn" + files[i]);
                const bat = spawn('cmd.exe', ['/c', 'call ./cmd_files/' + files[i]]);
                bat.stdout.on('data', (data) => {
                    console.log("logging" + data.toString());
                    io.emit('commands', {
                        message: "Stdout: " + data.toString()
                    });

                });

                bat.stderr.on('data', (data) => {
                    console.log("logging", data.toString());
                    io.emit('commands', {
                        message: "Stderr: " + data.toString()
                    });

                });
            }
        }

    });
});