// imports packages and functions
import express from 'express';
import log from '@src/utils/log';


// import routes
import artRoutes from '@src/routes/art';
import crittersRoutes from '@src/routes/critters';

// create router
let router = express.Router({strict: true});

// define constants
const API_VERSION = 'v2'

const API_RESOURCE_ENDPOINTS = [
    'art',
    'critters',
    'fossils',
    'furniture',
    'music',
    'villagers',
];

router.get('/', (req: any, res: express.Response) => {
    return res.status(200).json({message: 'Connected'});
});

router.get('/:version/**', function(req: any, res: express.Response, next: any) {
    let versionParam = req.params.version;
    log.debug(`requested resource: ${versionParam}`)
    if (versionParam !== API_VERSION) {
        return res.status(404).json({
            message: `Invalid API version ${versionParam}`
        });
    } else {
        next();
    }
});

router.get(`/${API_VERSION}/:resource/`, function(req: any, res: express.Response, next: any) {
    req.version = req.params.version
    let resourceParam = req.params.resource;

    log.debug(`requested resource: ${resourceParam}`)
    if (resourceParam.length === 0) {
        return res.status(404).json({message: "missing resource from request"});
    }
    if (!API_RESOURCE_ENDPOINTS.includes(resourceParam)) {
        return res.status(404).json({message: `Invalid requested resource: ${resourceParam}`});
    }
    next();
});

// router.use(`/${API_VERSION}/art/`, (req: any, res: express.Response, next: any) => {
//    req.locals.version = req.params.version;
//    next();
// }, artRoutes);
router.use(`/${API_VERSION}/art`, artRoutes);


router.use(`/${API_VERSION}/critters/`, (req: any, res: express.Response, next: any) => {
    req.version = req.params.version;
    next();
}, crittersRoutes);



export default router;
