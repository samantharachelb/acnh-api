import log from "../log";

let villagers = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync('src/api/data/villagers.json');
let jsonData = JSON.parse(dataFile);

villagers.get('/', (req, res) => {
    res.status(200).json(jsonData);
});

villagers.get('/:villagersId', (req, res) => {
    var villagersId = req.params.villagersId;
    if (Number.isInteger((villagersId * 1))) {
        villagersId = villagersId * 1;
        let result = jsonQuery(`[**][*id=${villagersId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any villagers with the ID ${villagersId}`
            });
        } else {
            villagersId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${villagersId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any villagers with the ID ${villagersId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = villagers;
