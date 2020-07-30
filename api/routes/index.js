import log from '../log';
const routes = require('express').Router();

const API_VERSION = 'v1'

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected'
    });

    log.success(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
});

routes.get('/:apiVersion', (req, res) => {
    if (req.params.apiVersion !== API_VERSION) {
        res.status(404).json({
            message: `Invalid API Version '${req.params.apiVersion}'.`
        })
    } else {
        res.status(400).json({
            message: 'Missing endpoint from request.'
        })
    }
});

module.exports = routes;

