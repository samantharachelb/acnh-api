import {Schema, model} from 'mongoose';

let schema = new Schema({
    id: Number,
    serial_id: Number,
    name: String,
    category: String,
    crafted_item_id: Number,
    card_color: String,
    recipes_to_unlock: Number,
    source: Object,
    source_notes: String,
    buy: Number,
    sell: Number,
    exchange: Object,
    icon_filename: String,
    materials: Object,
})

export let recipes = model('Recipes', schema, 'recipes');
