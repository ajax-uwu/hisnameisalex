const fs = require("fs");
const express = require("express");

const PORT = 8090;
const LOG_FILE = "./access.log";

const app = express();

function logIp(ip) {
    const now = new Date();
    const data = `\n${now.toString()}\nIP: ${ip}\n`;
    fs.writeFile(
        LOG_FILE,
        data,
        {
            encoding: "utf8",
            flag: "a",
        },
        () => {}
    );
}

app.get("/", function (req, res) {
    logIp(req.ip);
    console.log(`Connected: ${req.ip}`);
    res.sendFile("./index.html", { root: "." });
});

app.get("/public/:name", function (req, res) {
    res.sendFile(req.param("name"), { root: "./public" });
});

app.listen(PORT);
