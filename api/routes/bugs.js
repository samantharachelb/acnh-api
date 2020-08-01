import log from "../log";
import getValues from "../query";
import getKeys from "../query";


let bugs = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/bugs.json');
let jsonData = JSON.parse(dataFile);

bugs.get('/', (req, res) => {
    res.status(200).json(jsonData);
});

bugs.get('/:bugId', (req, res) => {
    var bugId = req.params.bugId;
    if (Number.isInteger((bugId * 1))) {
        bugId = bugId * 1;
        let result = jsonQuery(`[**][*id=${bugId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any bugs with the ID ${bugId}`
            });
        } else {
            bugId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${bugId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any bugs with the ID ${bugId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = bugs;