const ContactModel = require("../Models/Contact.model");

const ContactRouter = require("express").Router();

// ! ADD TO CONTACT
ContactRouter.get("/contacts/:uid/add/:fid", async (req, res) => {
    let userid = req.params.uid
    let fid = req.params.fid
    try {
        const adding = await ContactModel.findOne({ userID: userid });
        adding.contacts.forEach(element => {
            if (element == fid) {
                res.status(200).json({ Message: "User Already in your contacts" });
                return
            }
        });
        adding.contacts.push(fid)
        await ContactModel.findOneAndUpdate({ userID: userid }, adding)
        res.status(200).json({ Message: "Successfully added to contact" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});