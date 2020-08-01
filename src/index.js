'use strict';
import limit from 'express-rate-limit';
import log from 'api/log';

let app = require('express')();
let slash = require('express-trailing-slash');
let StatsD = require('hot-shots');
let routes = require('api/routes');

let dogstatsd = new StatsD({
    errorHandler: function (error) {
        log.error(`Socket errors caught here: ${error}`);
    }
});

const API_VERSION = 'v1'

app.set('trust proxy', '127.0.0.1');
app.enable('strict routing', true);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    dogstatsd.increment('page.views');
    next();
});

app.use(
    limit({
        message: {status: 429, message: "API Rate Limit Reached."},
        windowMs: 5 * 60 * 1000, // equal to 300,000ms or 5 minutes
        max: 100 // no more than 100 requests in 5 minutes
    })
);

app.use('/', routes);
app.use(slash());

app.listen(3000, () => {
    log.info('API available at http://localhost:3000');
});