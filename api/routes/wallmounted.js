import log from "../log";

let wallmounted = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/wallmounted.json');
let jsonData = JSON.parse(dataFile);

wallmounted.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);

});

wallmounted.get('/:wallmountedId', (req, res) => {
    var wallmountedId = req.params.wallmountedId;
    if (Number.isInteger((wallmountedId * 1))) {
        wallmountedId = wallmountedId * 1;
        let result = jsonQuery(`[**][*id=${wallmountedId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any wall-mounted items with the ID ${wallmountedId}`
            });
        } else {
            wallmountedId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${wallmountedId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any wall-mounted with the ID ${wallmountedId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = wallmounted;
