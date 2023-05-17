const LogsModel = require("../Models/Logs.model");
const LogsRouter = require("express").Router();

// ! GET ALL LOGS 
LogsRouter.get("/", async (req, res) => {
    try {
        const Logs = await LogsModel.find();
        res.status(200).json({ Logs });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});

module.exports = LogsRouter;