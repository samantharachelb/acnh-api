import {Schema, model} from 'mongoose';

let schema = new Schema ({
    id: Number,
    name: String,
    diy: Boolean,
    stack_size: Number,
    tag: String,
    hha: Object,
    exchange: Object,
    variants: Object,
    image: Object
})

export let other = model('Other', schema, 'other');
