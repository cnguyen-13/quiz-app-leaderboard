const express = require("express");
const router = express.Router();
const db = require("../dbleaderboards");

router.get("/:difficulty", async (req, res) => {
    try {
        const data = await db.getByDifficulty(req.params.difficulty);
        res.json(data);
    } catch (err) {
        res.sendStatus(500).json({ msg: "Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const sendData = await db.postQuiz(data);
        res.json(sendData);
    } catch (err) {
        res.sendStatus(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
