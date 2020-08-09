import * as mongoose from 'mongoose';
let schema = new mongoose.Schema({});

export let Fossils = mongoose.model('Fossils', schema , 'fossils');
