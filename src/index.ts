require('@babel/register')({extensions: ['.ts']});
import {app} from './app';
import log from '@utils/log';

let server = app.listen(3000, 'localhost', () => {
    log.info('API available at http://localhost:3000');
});