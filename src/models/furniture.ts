import * as mongoose from "mongoose";

let schema = new mongoose.Schema({
    id: Number,
    name: String,
    diy: Boolean,
    size: String,
    catalog: String,
    tag: String,
    set: String,
    series: String,
    customization_kit_cost: Number,
    attributes: Object,
    exchange: Object,
    hha: Object,
    body: Object,
    pattern: Object,
    variants: Object
});

export let furniture = mongoose.model('Furniture', schema, 'furniture');
export let housewares = mongoose.model('Housewares', schema, 'housewares');
export let misc = mongoose.model('Misc', schema, 'misc');
export let wallMounted = mongoose.model('Wall Mounted', schema, 'wall_mounted');

