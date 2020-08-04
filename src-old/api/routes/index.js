import log from '../log';
let artRouter = require('./art');
let bugRouter = require('./bugs');
let fishRouter = require('./fish');
let fossilRouter = require('./fossils');
let hourlyRouter = require('./hourly');
let housewareRouter = require('./houseware');
let miscRouter = require('./misc');
let musicRouter = require('./music');
let seaCreatureRouter = require('./sea');
let villagerRouter = require('./villagers');
let wallmountedRouter = require('./wallmounted');
let routes = require('express').Router({
    strict: true
});

const VALID_ENDPOINTS = [
    'art',
    'bugs',
    'fish',
    'fossils',
    'hourly_bgm',
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

routes.use('/:apiVersion/bugs', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, bugRouter);

routes.use('/:apiVersion/fish', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, fishRouter);

routes.use('/:apiVersion/fossils', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, fossilRouter);

routes.use('/:apiVersion/hourly_bgm', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, hourlyRouter);

routes.use('/:apiVersion/houseware', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, housewareRouter);

routes.use('/:apiVersion/misc', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, miscRouter);

routes.use('/:apiVersion/music', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, musicRouter);

routes.use('/:apiVersion/sea_creatures', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, seaCreatureRouter);

routes.use('/:apiVersion/villagers', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, villagerRouter);

routes.use('/:apiVersion/wall_mounted', (req, res, next) => {
    req.apiVersion = req.params.apiVersion;
    next();
}, wallmountedRouter);

module.exports = routes;

