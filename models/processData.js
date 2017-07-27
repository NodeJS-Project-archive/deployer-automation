var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var processDataSchema = new Schema({
    "id": Number,
    "processName": {
        type: String
    },
    "processId": {
        type: String,
        default: ""
    },
    "commandsData": {
        type: [String],
        default: []
    },
    "status": {
        type: String,
        default: "Notstarted"
    },
    "error": {
        type: [String],
        default: []
    },
    "startTime": {
        type:String,
        default:""
    },
    "endTime": {
        type:String,
        default:""
    }
});
module.exports = processDataSchema;
