import log from "../log";

let fossils = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/fossils.json');
let jsonData = JSON.parse(dataFile);

fossils.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);

});

fossils.get('/:fossilsId', (req, res) => {
    var fossilsId = req.params.fossilsId;
    if (Number.isInteger((fossilsId * 1))) {
        fossilsId = fossilsId * 1;
        let result = jsonQuery(`[**][*id=${fossilsId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any fossils with the ID ${fossilsId}`
            });
        } else {
            fossilsId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${fossilsId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any fossils with the ID ${fossilsId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = fossils;
