const mongoose = require('mongoose');
var mail = require('./sendMail');
module.exports = {
    generateOTP: (req, res) => {
        var registerUsers = require('../models/registerUser.js');
        var RegisterUser = mongoose.model('registerusers', registerUsers);


        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }


        RegisterUser.findOne({ "email": req.body.email }, (err, docs) => {
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
                var randomNum;
                if (docs != null) {
                    randomNum = Math.round(Math.random() * (999999 - 100000) + 100000);

                    RegisterUser.findOneAndUpdate({ "email": req.body.email }, {
                        $set: {
                            "pwd": "" + randomNum
                        }
                    }).exec((err, docs) => {
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
                                mail.sendOTPMail(req.body.email, randomNum);
                                info = {
                                    stat: true,
                                    otp: ""+randomNum
                                }
                            }
                            else {
                                console.log("inside");
                                info = {
                                    stat: false,
                                    msg: "Data is not found"
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
                        msg: "entered email is not found"
                    }
                    res.send(info);
                    res.end();
                }
                //console.log(docs);
            };
        });
    }
}