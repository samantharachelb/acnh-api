import {Schema, model} from 'mongoose';

let schema = new Schema({
    id: Number,
    name: String,
    diy: Boolean,
    style: Object,
    size: String,
    catalog: String,
    seasonal_availability: String,
    shape: Object,
    attributes: Object,
    exchange: Object,
    hha: Object,
    image: Object,
    variants: Object
});

export let clothing = model('Achievements', schema, 'achievements');
export let accessories = model('Accessories', schema, 'accessories');
export let bags = model('Bags', schema, 'bags');
export let bottoms = model('Bottoms', schema, 'bottoms');
export let clothingOther = model('Clothing Other', schema, 'clothing_other');
export let dressUp = model('Dress-up', schema, 'dress_up');
export let headwear = model('Headwear', schema, 'headwear');
export let shoes = model('Shoes', schema, 'shoes');
export let socks = model('Socks', schema, 'socks');
export let tops = model('Tops', schema, 'tops');
export let umbrellas = model('Umbrellas', schema, 'umbrellas')
