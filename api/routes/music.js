import log from "../log";

let music = require('express').Router();
let fs = require('fs');
let jsonQuery = require('json-query');

let dataFile = fs.readFileSync(__dirname + '/../../data/music.json');
let jsonData = JSON.parse(dataFile);

music.get('/', (req, res) => {
    res.status(200).json(jsonData);
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);

});

music.get('/:musicId', (req, res) => {
    var musicId = req.params.musicId;
    if (Number.isInteger((musicId * 1))) {
        musicId = musicId * 1;
        let result = jsonQuery(`[**][*id=${musicId}`, {data: jsonData}).value;
        if (Object.keys(result).length === 0) {
            res.status(404).json({
                message: `Could not find any music with the ID ${musicId}`
            });
        } else {
            musicId = result[0]["file-name"];
        }
    }

    let query = jsonQuery(`${musicId}`, { data: jsonData}).value;
    if (query === undefined || query === null) {
        res.status(404).json({message: `Could not find any music with the ID ${musicId}`});
    } else {
        res.status(200).json(query);
    }
});

module.exports = music;
