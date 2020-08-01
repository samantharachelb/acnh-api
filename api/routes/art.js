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
    var artId = req.params.artId;
    if (Number.isInteger((artId * 1))) {
        artId = artId * 1;
        let result = jsonQuery(`[**][*id=${artId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any art with the ID ${artId}`
            });
        } else {
            artId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${artId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any art with the ID ${artId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = art;
