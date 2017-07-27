const mongoose = require('mongoose');
var portastic = require('portastic');
var os = require('os-utils');
var os1 = require('os');

module.exports = {
    getPortsAvailable: (req, res) => {
        var availablePorts = "";
        ses = req.session;
        if (ses.email) {

            portastic.find({
                min: 8000,
                max: 8080
            })
                .then(function (ports) {
                    console.log('Ports available between 8000 and 8080 are: %s',
                        ports.join(', '));
                    availablePorts += ports.join(', ');
                    console.log(os.platform());
                    console.log(os.totalmem());
                    console.log(os.freemem());
                    console.log("userInfo:",os1.userInfo().username);
                    //console.log("hostname:",os1.hostname());
                    os.cpuUsage( function(value) { console.log(value); } );
                    info = {
                        stat: true,
                        ports: availablePorts,
                        platform: os.platform()+" "+os1.arch() ,
                        username:os1.userInfo().username,
                        totalmem:os.totalmem(),
                        freemem:os.freemem()
                    }
                    res.send(info);
                    res.end();
                });

        } else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }
    }
}