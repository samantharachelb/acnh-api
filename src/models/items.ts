import {Schema, model} from 'mongoose';
let schema = new Schema({
    id: Number,
    name: String,
    fossil_group: String,
    diy: Schema.Types.Mixed,
    stack_size : Number,
    style: Object,
    real_artwork_title: String,
    artist: String,
    description: String,
    size: String,
    catalog: String,
    tag: String,
    set: String,
    series: String,
    customization_kit_cost: String,
    seasonal_availability: String,
    shape: Object,
    attributes: Object,
    exchange: Object,
    hha: Object,
    body: Object,
    pattern: Object,
    ceiling: Object,
    vfx: Object,
    window: Object,
    curtain: Object,
    images: Object,
    variant_id: Number,
    variants: Object
})

export let items = model('Items', schema, 'items');
