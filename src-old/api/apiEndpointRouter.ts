import log from '@utils/log';
import * as express from 'express';

let apiEndpointRouter = express.Router({strict: true, mergeParams: true});

const API_ENDPOINTS = [
    'art',
    'bugs',
    'fish',
    'fossils',
    'hourly_bgm',
    'housewares',
    'misc',
    'music',
    'sea_creatures',
    'villagers',
    'wall_mounted'];
//const API_EP_DEPRECATED = [];

apiEndpointRouter.get('/', (req: any, res: express.Response) => {
    let apiVersion = req.apiVersion;
    return res.status(400).json({
        message: 'Missing API endpoint from request'
    });
});

apiEndpointRouter.get('/:endpoint', (req: any, res: express.Response, next: express.NextFunction) => {
    let endpointParam = req.params.endpoint;
    if (!API_ENDPOINTS.includes(endpointParam)) {
        return res.status(400).json({
            message: `Invalid API endpoint ${endpointParam}`
        });
    }
})

module.exports = apiEndpointRouter;