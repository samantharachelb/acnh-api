import {Schema, model} from 'mongoose';

let schema = new Schema({
    name: String,
    category: String,
    source: Object,
    buy: Number,
    filename: String,
    image: String
});

export let construction = model('Construction', schema, 'construction');
