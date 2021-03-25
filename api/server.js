const express = require("express");

const accoutRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());
server.use("/api/accounts", accoutRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server;
