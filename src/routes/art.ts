import express from 'express';
import jsonQuery from 'json-query';
const artData = require('@src/api/data/art');

let router = express.Router();

router.get('/', function(req: any, res: any) {
    res.status(200).json(artData);
})

export default router;