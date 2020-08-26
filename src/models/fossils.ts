import * as mongoose from 'mongoose';
let schema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    fossil_group: String,
    catalog: String,
    size: String,
    attributes: Object,
    hha: Object,
    variants: Object
});

export let fossils = mongoose.model('Fossils', schema , 'fossils');
