const express = require("express");
require("./db/conn"); // Database connection
const router = require('./routes/router');

const app = express();
const port = 9000;

app.use(express.json());
app.use(router);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Gracefully shut down server
process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
