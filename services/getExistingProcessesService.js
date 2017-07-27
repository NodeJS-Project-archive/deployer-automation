const mongoose=require('mongoose');
module.exports={
      getExistingProcesses: (req, res) => {
        ses = req.session;
        if (ses.email) {
            console.log("inside getExistingProcesses");
            var getExistingProcesses = require('../models/process.js');
            var GetExistingProcesses = mongoose.model('processes', getExistingProcesses);

            GetExistingProcesses.find({ "email": ses.email }, (err, docs) => {
                if (err) {
                    //console.log(docs);
                   info = {
                        stat: false,
                        msg: err
                    }

                } else {
                    //res.json({ error: err });
                     info = {
                        stat: true,
                        processes:docs
                    }
                    console.log(docs);
                    
                };
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