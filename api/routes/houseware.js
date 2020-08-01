import log from "../log";

let houseware = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/houseware.json');
let jsonData = JSON.parse(dataFile);

houseware.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);

});

houseware.get('/:housewareId', (req, res) => {
    var housewareId = req.params.housewareId;
    if (Number.isInteger((housewareId * 1))) {
        housewareId = housewareId * 1;
        let result = jsonQuery(`[**][*id=${housewareId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any houseware items with the ID ${housewareId}`
            });
        } else {
            housewareId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${housewareId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any houseware items with the ID ${housewareId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = houseware;
