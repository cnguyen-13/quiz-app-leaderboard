const express = require("express");
const cors = require("cors");
const route = require("./routes");
const PORT = require("./serverconfig");
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use("/api/leaderboards", route);

//Listen for connections
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}!`);
});
