import log from 'utils/log';

let routes = require('express').Router({
    strict: true
});

const API_VERSION = 'v' + process.env.npm_package_version.split('.')[0];

routes.get('/', (req: any, res: any) => {
    return res.status(200).json({
        message: 'Connected'
    });
});

module.exports = routes;