import log from '../log';
let artRouter = require('./art');
let routes = require('express').Router({
    strict: true
});

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

const API_VERSION = 'v1';

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected'
    });
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
});

routes.get(['/:apiVersion/:endpoint/**'], (req, res, next) => {
    let apiVersion = req.params.apiVersion;
    let endpoint = req.params.endpoint;

    if (apiVersion !== API_VERSION) {
        return res.status(404).json({
            message: `Invalid API version ${apiVersion}`
        });
    }

    if (!endpoint) {
        return res.status(400).json({
            message: 'Missing API endpoint from request.'
        });
    } else if (!VALID_ENDPOINTS.includes(endpoint)) {
        return res.status(404).json({
            message: `${endpoint} is not a valid endpoint.`
        });
    }
    next();
})

routes.use('/:apiVersion/art', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, artRouter);

module.exports = routes;

