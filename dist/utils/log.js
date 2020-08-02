"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
let $ = 'ACNH API:';
const now = () => `[${new Date().toLocaleTimeString()}]`;
exports.default = {
    info: (x) => console.info(chalk_1.default.green(chalk_1.default.bold(now()) + '[INFO]' + $), x),
    warn: (x) => console.warn(chalk_1.default.yellow(chalk_1.default.bold(now() + '[WARN]' + $), x)),
    error: (x) => console.error(chalk_1.default.red(chalk_1.default.bold(now() + '[ERROR]' + $), x)),
    debug: (x) => console.info(chalk_1.default.cyanBright(chalk_1.default.bold(now() + '[DEBUG]' + $), x))
};
//# sourceMappingURL=log.js.map