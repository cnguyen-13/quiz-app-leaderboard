const express = require("express");
const cors = require("cors");
const route = require("./routes");
const PORT = require("./serverconfig");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/leaderboards", route);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}!`);
});
