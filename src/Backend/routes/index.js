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

module.exports = router;
