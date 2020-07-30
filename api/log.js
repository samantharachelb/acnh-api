import c from 'chalk';
import API_VERSION from './index';

const $ = 'ACNH API:'
const now = () => `[${new Date().toLocaleTimeString()}]`;

export default {
    info: x => console.info(c.magenta(c.bold(now()) + $), x),
    warn: x => console.warn(c.yellow(c.bold(now() + $), x)),
    error: x => console.error(c.red(c.bold(now() + $), x)),
    success: x => console.info(c.green(c.bold(now() + $), x))
};