'use strict';

import express from 'express';
import limit from 'express-rate-limit';
const routes = require('./routes');

import log from './log';

let app = express();

const API_VERSION = 'v1'
const VALID_ENDPOINTS = [
    'art',
    'bugs',
    'fish',
    'fossils',
    'hourly',
    'houseware',
    'misc',
    'music',
    'sea-creatures',
    'villagers',
    'wall-mounted'
];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.set('trust proxy', '127.0.0.1');

app.use(
    limit({
        message: {status: 429, message: "API Rate Limit Reached."},
        windowMs: 5 * 60 * 1000, // equal to 300,000ms or 5 minutes
        max: 100 // no more than 100 requests in 5 minutes
    })
);


// routes

// app.get(`/${API_VERSION}/*`, (req, res) => {
//     const endpoint = decodeURI(req.originalUrl.substr(`/${API_VERSION}/`.length)).trim();
//     console.log(VALID_ENDPOINTS.includes(endpoint))
//     if (VALID_ENDPOINTS.includes(endpoint) === false) {
//         res.statusCode = 400;
//         log.error(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
//         return res.json({
//             status: res.statusCode,
//             message: `Invalid Endpoint '${endpoint}'`
//         });
//     } else {
//         res.statusCode = 200;
//         log.success(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
//         return res.json({
//
//         })
//     }
// });

app.use('/', routes);

app.listen(3000, () => {
    log.info('API available at http://localhost:3000');
});