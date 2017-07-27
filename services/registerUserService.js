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
    registerUser: (req, res) => {
        ses = req.session;
        console.log("hello");
        var registerUsers = require('../models/registerUser.js');
        var RegisterUser = mongoose.model('registerusers', registerUsers);
        console.log(req.body);
        var password=encrypt(req.body.pwd);
        var registerUser = new RegisterUser({
            email: req.body.email,
            first: req.body.first,
            last: req.body.last,
            empId: req.body.empId,
            pwd: password
        });
        registerUser.save(function (err) {
            if (err) {
                info = {
                    stat: false,
                    status: 404,
                    msg: "you are failed to register " + err
                }
                console.log(err);

            }
            else {
                info = {
                    stat: true,
                    status: 200,
                    msg: "you are successfully registered"
                }

            }
            res.send(info);
            res.end();
        });
    }
}