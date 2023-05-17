const mongoose = require("mongoose");
const logSchema = mongoose.Schema({
    socketID: String,
    UserName: String,
    createdAt: Date
},)
const LogsModel = mongoose.model("Logs", logSchema)
module.exports = LogsModel;