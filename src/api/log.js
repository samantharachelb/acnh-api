import c from 'chalk';

const $ = 'ACNH API:'
const now = () => `[${new Date().toLocaleTimeString()}]`;

export default {
    info: x => console.info(c.green(c.bold(now()) + '[INFO]' + $), x),
    warn: x => console.warn(c.yellow(c.bold(now() + '[WARN]' + $), x)),
    error: x => console.error(c.red(c.bold(now() + '[ERROR]' + $), x)),
    debug: x => console.info(c.cyanBright(c.bold(now() + '[DEBUG]' + $), x))
};