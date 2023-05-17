const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile_pic: String,
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contacts" }]

})
const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel;