import log from "../log";

const art = require('express').Router();
const jsonData = require('../../data/art.json');

art.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
});

art.get('/:artId', (req, res, next) => {
    let apiVersion = req.apiVersion;
    let artId = req.params.artId;

});

module.exports = art;
