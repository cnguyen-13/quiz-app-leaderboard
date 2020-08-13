const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const route = require("./routes");

app.use(express.json());
app.use("/api/leaderboards", route);

app.listen(PORT, () => {
    console.log("Server is listening!");
});
