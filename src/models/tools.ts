import {Schema, model} from 'mongoose';

let schema = new Schema({
    id: Number,
    name: String,
    diy: Boolean,
    size: String,
    source: Object,
    stack_size: Number,
    uses: Number,
    customize: Boolean,
    customization_kit_cost: Number,
    exchange: Object,
    hha: Object,
    body: String,
    variant_id: Number,
    variants: Object
})

export let tools = model('Tools', schema, 'tools');
