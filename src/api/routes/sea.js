import log from "../log";

let seaCreatures = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync('src/api/data/sea.json');
let jsonData = JSON.parse(dataFile);

seaCreatures.get('/', (req, res) => {
    res.status(200).json(jsonData);
});

seaCreatures.get('/:seaCreaturesId', (req, res) => {
    var seaCreaturesId = req.params.seaCreaturesId;
    if (Number.isInteger((seaCreaturesId * 1))) {
        seaCreaturesId = seaCreaturesId * 1;
        let result = jsonQuery(`[**][*id=${seaCreaturesId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any sea creatures with the ID ${seaCreaturesId}`
            });
        } else {
            seaCreaturesId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${seaCreaturesId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any sea creatures with the ID ${seaCreaturesId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = seaCreatures;
