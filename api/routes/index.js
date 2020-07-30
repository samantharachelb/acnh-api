import log from '../log';
const artRouter = require('./art');
const routes = require('express').Router();

const API_VERSION = 'v1';
const VALID_ENDPOINTS = [
    'art',
    'bugs',
    'fish',
    'fossils',
    'hourly',
    'houseware',
    'misc',
    'music',
    'sea_creatures',
    'villagers',
    'wall_mounted'
];

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected'
    });
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
});

routes.get('/:apiVersion', (req, res, next) => {
    let apiVersion = req.params.apiVersion;
    log.debug(`var: apiVersion | value: ${apiVersion}`);
    log.debug(`var: API_VERSION | value: ${API_VERSION}`);
    if (apiVersion !== API_VERSION) {
        res.status(404).json({
            message: `Invalid API Version '${apiVersion}'.`
        })
        log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    }

    if (!req.params.endpoint) {
        res.status(400).json({
            message: 'Missing endpoint from request.'
        });
        log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    }

    if (VALID_ENDPOINTS.includes(req.params.endpoint) === false) {
        res.status(400).json({
            message: `Invalid API endpoint ${req.param.endpoint}`
        });
        log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    }

    next();
});

routes.use('/:apiVersion/art', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, artRouter);

module.exports = routes;

