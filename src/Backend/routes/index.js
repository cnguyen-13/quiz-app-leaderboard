const express = require("express");
const router = express.Router();
const db = require("../dbleaderboards");

router.get("/", async (req, res) => {
    try {
        const data = await db.getAllTogether();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

router.get("/:difficulty", async (req, res) => {
    try {
        const data = await db.getAllFromDifficulty(req.params.difficulty);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const sendData = await db.postQuizByDifficulty(data);
        console.log("POST SUCCESS");
        res.sendStatus(200).json(sendData);
    } catch (err) {
        res.sendStatus(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
