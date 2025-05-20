const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

// Automatically free port before starting the server
exec(`npx kill-port ${PORT}`, (err) => {
    if (err) console.log(`⚠️ No process found on port ${PORT}, starting server.`);
    
    app.listen(PORT, () => {
        console.log(`✅ Server running at http://localhost:${PORT}`);
    });
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/new", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    res.send(`
        <h1>Post Published Successfully!</h1>
        <h2>${title}</h2>
        <p>${content}</p>
        <a href="/">Back to Compose</a>
    `);
});
