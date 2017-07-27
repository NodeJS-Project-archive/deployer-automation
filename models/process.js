var mongoose = require("mongoose");
var processDataSchema=require('./processData');
var Schema = mongoose.Schema;
var processSchema = new Schema({
    "title":{
        type:String
    },
	"processList":[processDataSchema],
	"date": {
        type: Date,
        default: Date.now
    },
    "email":String
});
module.exports = processSchema;