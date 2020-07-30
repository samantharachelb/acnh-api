import log from "../log";

let art = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/art.json');
let jsonData = JSON.parse(dataFile);

art.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);

});

art.get('/:artId', (req, res) => {
    let artId = req.params.artId
    if (Number.isInteger(artId*1)) {
        let artIdNum = artId * 1
        let query = jsonQuery(`[**][*id=${artIdNum}`, { data: jsonData}).value;
        log.info(query);
        if (Object.keys(query).length === 0) {
            res.status(404).json({message: `Could not find Art with ID ${artId}`});
        } else {
            res.status(200).json(query);
        }
    } else {
        let query = jsonQuery(`${artId}`, { data: jsonData}).value;
        log.debug(query);
        if (query === undefined || query === null) {
            res.status(404).json({message: `Could not find Art with ID ${artId}`});
        } else {
            res.status(200).json(query);
        }
    }
});

module.exports = art;
