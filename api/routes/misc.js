import log from "../log";

let misc = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/misc.json');
let jsonData = JSON.parse(dataFile);

misc.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);

});

misc.get('/:miscId', (req, res) => {
    var miscId = req.params.miscId;
    if (Number.isInteger((miscId * 1))) {
        miscId = miscId * 1;
        let result = jsonQuery(`[**][*id=${miscId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any misc items with the ID ${miscId}`
            });
        } else {
            miscId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${miscId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any misc items with the ID ${miscId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = misc;
