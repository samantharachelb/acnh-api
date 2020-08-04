import log from "../log";

let fish = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync('src/api/data/fish.json');
let jsonData = JSON.parse(dataFile);

fish.get('/', (req, res) => {
    res.status(200).json(jsonData);
});

fish.get('/:fishId', (req, res) => {
    var fishId = req.params.fishId;
    if (Number.isInteger((fishId * 1))) {
        fishId = fishId * 1;
        let result = jsonQuery(`[**][*id=${fishId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any fish with the ID ${fishId}`
            });
        } else {
            fishId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${fishId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any fish with the ID ${fishId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = fish;
