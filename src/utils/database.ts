import fs from 'fs';
import log from './log';
import mongoose from 'mongoose';
import toml from 'toml';

let configFile = toml.parse(fs.readFileSync('src/config.toml', 'utf-8'));
let mongoConfig = configFile.MongoDb;
