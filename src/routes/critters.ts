import express from 'express';
import jsonQuery from 'json-query';
import * as jsonSearch from '@utils/jsonSearch';

const fs = require('fs');
let router = express.Router();
let bugData = JSON.parse(fs.readFileSync('src/api/data/bugs.json'));
let fishData = JSON.parse(fs.readFileSync('src/api/data/fish.json'));
let seaCreatureData = JSON.parse(fs.readFileSync('src/api/data/sea_creatures.json'));


router.get('/', (req: express.Request, res: express.Response) => {
    
})