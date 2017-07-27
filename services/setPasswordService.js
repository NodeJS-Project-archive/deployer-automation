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
    setPassword: (req, res) => {
        var registerUsers = require('../models/registerUser.js');
        var RegisterUser = mongoose.model('registerusers', registerUsers);


        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }
         var password=encrypt(req.body.pwd);

        RegisterUser.findOneAndUpdate({ "email": req.body.email }, {
            $set: {
                "pwd": password
            }
        }).exec((err, docs) => {
            if (err) {
                console.log("inside");
                info = {
                    stat: false,
                    msg: err
                }
                //console.log(docs);

            }
            else {
                if (docs != null) {

                    info = {
                        stat: true
                    }
                }
            }
            res.send(info);
            res.end();
        });
    }
}