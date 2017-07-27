const mongoose = require("mongoose");
module.exports={
    saveProcessData: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(req.body);

            var processes = require('../models/process.js');
            var Process = mongoose.model('processes', processes);

            if (req.body._id == undefined) {
                var process = new Process({
                    email:ses.email,
                    title: req.body.title,
                    processList: req.body.processList
                });
                process.save(function (err) {
                    if (err) {
                        info = {
                            stat: false,
                            msg: err

                        }
                        console.log(err);
                       
                        
                    }
                    else {
                        info = {
                            stat: true,
                            msg:"Data saved successfully"
                        }
                    }
                    res.send(info);
                    res.end();

                });
            } else {
                Process.update({ '_id': req.body._id }, { $set: { 'processList': req.body.processList,'suiteName': req.body.title, } }, function (err, doc) {
                    if (err) {
                         info = {
                            stat: false,
                            msg: err

                        }
                        
                    } else {
                       info = {
                            stat: true,
                            msg:"Data saved successfully"
                        }
                    }
                    res.send(info);
                    res.end();
                })

            }
        }
        else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }
    }
    
}