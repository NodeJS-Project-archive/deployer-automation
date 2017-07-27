var express = require("express");
var router = express.Router();
//var schedule = require('node-schedule');
const mongoose = require("mongoose");
 var registerUserService = require('../services/registerUserService');
// var emailCheckService = require('../services/emailCheckService');
 var generateOTPService = require('../services/generateOTPService');
// var OTPCheckService = require('../services/OTPCheckService');
 var setPasswordService = require('../services/setPasswordService');

 router.post("/registerUser",registerUserService.registerUser);

 router.post("/generateOTP",generateOTPService.generateOTP);

// router.post("/OTPCheck",OTPCheckService.OTPCheck);

 router.post("/setPassword",setPasswordService.setPassword);

// router.post("/emailCheck", emailCheckService.emailCheck);


module.exports = router;