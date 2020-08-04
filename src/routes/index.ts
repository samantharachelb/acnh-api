// imports packages and functions
import express from 'express';
import log from '@src/utils/log';
const Joi = require('joi');
const validate = require('express-joi-validate');

// import routes
import artRoutes from '@src/routes/art';

// create router
let router = express.Router({strict: true});

// define constants
const API_VERSION = 'v2';

const API_RESOURCE_ENDPOINTS = [
    'art',
    'art/paintings',
    'art/sculptures',
    'critters',
    'critters/bugs',
    'critters/fish',
    'critters/sea_creatures',
    'fossils',
    'furniture',
    'furniture/housewares',
    'furniture/misc',
    'furniture/wall_mounted',
    'music',
    'villagers',
];

router.get('/', (req: any, res: express.Response) => {
    res.status(200).json({message: 'Connected'});
});

router.get('/:version/', function(req: any, res: express.Response, next: any) {
    let versionParam = req.params.version;
    log.debug(`requested resource: ${versionParam}`)
    if (versionParam !== API_VERSION) {
        return res.status(404).json({
            message: `Invalid API version ${versionParam}`
        });
    }
    res.status(404).json({message: "missing resource from request"});
});

router.get(`/${API_VERSION}/:resource`, function(req: any, res: express.Response, next: any) {
    req.version = req.params.version
    let resourceParam = req.params.resource;

    log.debug(`requested resource: ${resourceParam}`)

    if (!API_RESOURCE_ENDPOINTS.includes(resourceParam)) {
        return res.status(404).json({message: `Invalid requested resource: ${resourceParam}`});
    }
    next();
});

router.use('/:version/art', (req: any, res: express.Response, next: any) => {
   req.version = req.params.version;
   next();
}, artRoutes);

export default router;