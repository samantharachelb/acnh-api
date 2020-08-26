import {Schema, model} from 'mongoose';

let schema = new Schema({
    id: Number,
    name: String,
    diy: String,
    stack_size: Number,
    variants: Object
});

export let fencing = model('Fencing', schema, 'fencing');
