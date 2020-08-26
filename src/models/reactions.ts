import {Schema, model} from 'mongoose';

let schema = new Schema({
    name: String,
    source: Object,
    filename: String,
    image: Object,
});

export let reactions = model('Reactions', schema, 'reactions');
