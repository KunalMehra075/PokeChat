
const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]

})
const ContactModel = mongoose.model("Contacts", contactSchema)
module.exports = ContactModel;