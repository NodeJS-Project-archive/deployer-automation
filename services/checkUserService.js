const mongoose = require('mongoose');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports = {
    checkUser: (req, res) => {
        var info = {};
        ses = req.session;
        var path = require("path");
        var registerUsers = require('../models/registerUser.js');
        //  var db = mongoose.connection.db;
        var RegisterUser = mongoose.model('registerUsers', registerUsers);
        var password=encrypt(req.body.pwd);
        console.log(req.body);
        RegisterUser.findOne({ "email": req.body.email }, (err, docs) => {
            if (err) {
                //console.log(docs);
                //console.log(hello);
                info = {
                    stat: false,
                    msg: err
                }
                res.send(info);
                res.end();
               // next(err);
            } else {
                if (docs != null) {
                    RegisterUser.findOne({ "email": req.body.email, "pwd": password }, (err, docs) => {
                        if (err) {

                            info = {
                                stat: false,
                                msg: err
                            }
                            res.send(info);
                            res.end();
                            //console.log(docs);

                        } else {
                            //res.json({ error: err });
                            if (docs != null) {

                                ses.name = docs.first + " " + docs.last;
                                info = {
                                    stat: true,
                                    name: ses.name
                                }
                                ses.email = docs.email;
                                console.log(ses.name);
                            }
                            else {
                                console.log("inside");
                                info = {
                                    stat: false,
                                    msg: "Wrong Password!"
                                }
                            }
                            res.send(info);
                            res.end();

                        };
                    });
                }
                else {
                    info = {
                        stat: false,
                        msg: "user doesn't found"
                    }
                    res.send(info);
                    res.end();
                }
                //res.json({ error: err });

            };

        });

    }
}