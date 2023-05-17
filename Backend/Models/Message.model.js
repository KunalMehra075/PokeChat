// message's ID, sender ID, recipient ID, message content, timestamp, and any attachments.
const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true },
    recipentID: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true },
    content: String,
    attachments: [String]

}, {
    timestamps: true
})
const MessageModel = mongoose.model("Messages", messageSchema)
module.exports = MessageModel;