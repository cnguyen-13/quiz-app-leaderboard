const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const route = require("./routes");

app.use(express.json());
app.use(cors());
app.use("/api/leaderboards", route);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}!`);
});
