import log from "../log";

let hourly = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/hourly.json');
let jsonData = JSON.parse(dataFile);

hourly.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);

});

hourly.get('/:hourlyId', (req, res) => {
    var hourlyId = req.params.hourlyId;
    if (Number.isInteger((hourlyId * 1))) {
        hourlyId = hourlyId * 1;
        let result = jsonQuery(`[**][*id=${hourlyId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any hourly BGM with the ID ${hourlyId}`
            });
        } else {
            hourlyId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${hourlyId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any hourly BGM with the ID ${hourlyId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = hourly;
