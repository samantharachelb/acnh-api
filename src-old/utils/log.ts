import c from 'chalk';

let $ = 'ACNH API:'
const now = () => `[${new Date().toLocaleTimeString()}]`;

export default {
    info: (x: any) => console.info(c.green(c.bold(now()) + '[INFO]' + $), x),
    warn: (x: any)  => console.warn(c.yellow(c.bold(now() + '[WARN]' + $), x)),
    error: (x: any) => console.error(c.red(c.bold(now() + '[ERROR]' + $), x)),
    debug: (x: any) => console.info(c.cyanBright(c.bold(now() + '[DEBUG]' + $), x))
};