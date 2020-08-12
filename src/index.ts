require('@babel/register')({extensions: ['.ts']});
import {app} from './app';
import log from '@utils/log';
const config = require('@src/config');

let server = app.listen(config.app.port, 'localhost', () => {
    log.info('API available at http://localhost:3000');
});

