"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const log_1 = __importDefault(require("utils/log"));
let slash = require('express-trailing-slash');
let StatsD = require('hot-shots');
const API_VERSION = 'v' + process.env.npm_package_version.split('.')[0];
let app = express_1.default();
exports.app = app;
let dogstatsd = new StatsD({
    errorHandler: function (error) {
        log_1.default.error(`Socket errors caught here: ${error}`);
    }
});
app.set('trust proxy', '127.0.0.1');
app.enable('strict routing');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    log_1.default.info(`[Client: ${req.ip}] - ${req.method}:${req.url} ${res.statusCode}`);
    dogstatsd.increment('page.views');
    next();
});
app.use(express_rate_limit_1.default({
    message: { status: 429, message: "API Rate Limit Reached." },
    windowMs: 5 * 60 * 1000,
    max: 100 // no more than 100 requests in 5 minutes
}));
app.use(slash());
//# sourceMappingURL=app.js.map