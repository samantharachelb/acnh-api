import express from 'express';
import limit from 'express-rate-limit';
import log from '@utils/log';
import mongoose from 'mongoose';
import routes from '@src/routes';
const config = require('@src/config');

let slash = require('express-trailing-slash');
let StatsD = require('hot-shots');

let mongoConnectionUri = `mongodb://${config.db.host}/${config.db.database}`;

let mongoOptions = {
    user: config.db.username,
    pass: config.db.password,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 1000, // timeout at 5000ms (5s)
    promiseLibrary: global.Promise
}

let app = express();

let dogstatsd = new StatsD({
    errorHandler: function(error: Error) {
        log.error(`Socket errors caught here: ${error}`);
    }
});

mongoose.connect(mongoConnectionUri, mongoOptions)
    .then(()=> {
        log.info(`MongoDB — Successfully connected to the database: ${config.db.database}`);
    }).catch((err: any) => {
        log.error(`Mongoose encountered an error when attempting to connect to  '${mongoConnectionUri}'`);
        log.error(`Error: ${err}`);
        process.exit(1);
    });

app.use(slash());

app.use(
    limit({
        message: {status: 429, message: "API Rate Limit Reached."},
        windowMs: 60 * 1000, // equal to 60,000ms or 1 minute
        max: 100 // set rate limit it 100req/min
    })
);

app.use((req: any, res: express.Response, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Forwarded-For, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.set('Cache-control', 'public, max-age=300, stale-if-error=60');
    log.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    dogstatsd.increment('page.views');
    next();
});

app.use('/', routes);

app.set('trust proxy', '127.0.0.1');
app.enable('strict routing');

export{app};
