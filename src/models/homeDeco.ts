import {Schema, model} from 'mongoose';
let schema = new Schema({
    id: Number,
    name: String,
    diy: Boolean,
    catalog: String,
    series: String,
    tag: String,
    exchange: Object,
    ceiling: Object,
    curtain: Object,
    hha: Object,
    vfx: Object,
    window: Object,
    variants: Object
});

export let wallpaper = model('Wallpaper', schema, 'wallpaper');
export let floors = model('Floors', schema, 'floors');
export let rugs = model('Rugs', schema, 'rugs');
