import express from 'express';
import jsonQuery from 'json-query';
import * as jsonSearch from "@utils/jsonSearch";

const fs = require('fs');
//const artData = require('@src/api/data/art.json');
const jsonFile = fs.readFileSync('src/api/data/art.json');
const artData = JSON.parse(jsonFile);
let router = express.Router();

router.get('/', function(req: any, res: any) {
    let query = jsonQuery(`[**]`, {data: artData}).value;
    res.status(200).json(query);
})

router.get('/:type/', function(req: any, res: any, next: any) {
    let typeParam = req.params.type;
    typeParam = typeParam.substr(0, typeParam.length - 1);
    if (typeParam === 'painting') {
        let query = jsonSearch.byName(typeParam, artData);
        if (query.length === 0) {
            res.status(404).json({message: `Item not found` });
        } else {
            res.status(200).json(query);
        }
    } else if (typeParam === 'statue') {
        let query = jsonSearch.byName(typeParam, artData);
        if (query.length === 0) {
            res.status(404).json({message: `Item not found` });
        } else {
            res.status(200).json(query);
        }
    }
    next();
})

router.get('/:id', function(req: any, res: any) {
    let idParam = req.params.id;
    if (Number.isInteger(idParam * 1)) {
        let query = jsonSearch.byId(idParam * 1, artData);
        if (query.length === 0) {
            res.status(404).json({message: `Item not found` });
        } else {
            res.status(200).json(query);
        }
    }
})
export default router;