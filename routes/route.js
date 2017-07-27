var express = require("express");
// var path = require("path");
// var session = require("express-session");
// var RedisStore = require("connect-redis")(session)
var router = express.Router();
//var service = require('../services/serviceImpl');
 var getPortsAvailableService = require('../services/getPortsAvailableService');

 var checkUserService = require('../services/checkUserService');

 var saveProcessDataService = require('../services/saveProcessDataService');

 var getExistingProcessesService = require('../services/getExistingProcessesService');

// var getTestsuitesInfoService = require('../services/getTestsuitesInfoService');

// var getHitAPIsInfoService = require('../services/getHitAPIsInfoService');

// var getAppService = require('../services/getAppService');

// var deleteAppService = require('../services/deleteAppService');

// var updateAppService = require('../services/updateAppService');

// var configAppService = require('../services/configAppService');

// var configSuiteService = require('../services/configSuiteService');

// var getClientAppService = require('../services/getClientAppService');

// var createClientService = require('../services/createClientService');

// var saveTestSuiteService = require('../services/saveTestSuiteService');

// var testAppChangeService = require('../services/testAppChangeService');

// var getTestSuiteService = require('../services/getTestSuiteService');

// var delSuitesService = require('../services/delSuitesService');

// var delSuiteService = require('../services/delSuiteService');

// var logoutService = require('../services/logoutService');

// var tokenGenerateService = require('../services/tokenGenerateService');

// var changePwdService = require('../services/changePwdService');

// var updateUserService = require('../services/updateUserService');

//var fetch=require('node-fetch');
//var nodemailer = require('nodemailer');
//var schedule = require('node-schedule');
// var ejs = require('ejs');
// const httpProxyAgent = require('https-proxy-agent');
// const agents = new httpProxyAgent("http://192.168.255.44:8080");
// var agent = new httpProxyAgent("http://proxy-src.research.ge.com:8080");

var ses;
router.get("/", (req, res) => {
    res.render("index.html");
});

router.get("/check", (req, res) => {
    // var info={
    //     name:"Spandana",
    //     study:"btech",
    //     lname:"bola"
    // }
    var info="This is string";
    res.send(info);
    res.end();

    
});


 router.get("/getPortsAvailable", getPortsAvailableService.getPortsAvailable);
 router.post("/checkUser", checkUserService.checkUser);
 router.post("/saveProcessData", saveProcessDataService.saveProcessData);
router.get("/getExistingProcesses", getExistingProcessesService.getExistingProcesses);
// router.get("/getClientApps", getClientAppsService.getClientApps);
// router.get("/getTestsuitesInfo", getTestsuitesInfoService.getTestsuitesInfo);
// router.get("/getApp", getAppService.getApp);
// router.get("/deleteApp", deleteAppService.deleteApp);
// router.post("/updateApp", updateAppService.updateApp);
// router.post("/configApp", configAppService.configApp);
// router.post("/configSuite", configSuiteService.configSuite);

// router.get("/getClientApp/:id", getClientAppService.getClientApp);
// router.get("/getUser", getUserService.getUser);

// router.post("/createClient", createClientService.createClient)
// router.post("/changePwd", changePwdService.changePwd)

// router.post("/saveTestSuite", saveTestSuiteService.saveTestSuite);
// router.post("/updateUser", updateUserService.updateUser);
// router.get("/testAppChange", testAppChangeService.testAppChange);

// router.get("/getTestSuite", getTestSuiteService.getTestSuite);
// router.get("/delSuites", delSuitesService.delSuites);
// router.get("/delSuite/:id", delSuiteService.delSuite);

// router.get("/logout", logoutService.logout);

// router.get("/tokenGenerate", tokenGenerateService.tokenGenerate);
// router.all("/test",(req,res)=>{
//     fetch(req.body.url,options).then((response)=>{
//         console.log(response); 
//         res.send(response);
//     }).catch((error)=>{
//         console.error(error)
//           res.send(error);
//     })
// })
// router.get("/success",(req,res)=>{
//     res.send({
//         status:200
//         });
// })
// router.get("/fail",(req,res)=>{
//     res.send({
//         status:500
//         });
// })
module.exports = router;