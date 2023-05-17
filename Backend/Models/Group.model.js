// group's ID, name, members, and messages.
const mongoose = require("mongoose");
const groupSchema = mongoose.Schema({
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]

})
const GroupModel = mongoose.model("Groups", groupSchema)
module.exports = GroupModel;