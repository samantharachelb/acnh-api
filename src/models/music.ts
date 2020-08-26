import {Schema, model} from 'mongoose';

let schema = new Schema({
    id: Number,
    name: String,
    source: String,
    catalog: String,
    size: String,
    hha: Object,
    variants: Object,
    image: Object
});

export let music = model('Music', schema, 'music');
