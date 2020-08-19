const express = require("express");
const router = express.Router();
const db = require("../dbleaderboards");

//GET rankings based on difficulty level
router.get("/:difficulty", async (req, res) => {
    try {
        const data = await db.getRankings(req.params.difficulty);
        res.json(data);
    } catch (err) {
        res.sendStatus(500).json({ msg: "Server Error" });
    }
});

//POST quiz results
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const sendData = await db.postQuizResults(data);
        res.json(sendData);
    } catch (err) {
        res.sendStatus(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
