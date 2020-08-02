"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const log_1 = __importDefault(require("utils/log"));
let server = app_1.app.listen(3000, 'localhost', () => {
    log_1.default.info('API available at http://localhost:3000');
});
//# sourceMappingURL=index.js.map