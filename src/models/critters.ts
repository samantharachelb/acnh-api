import {Schema, model} from "mongoose";

let schema = new Schema({
    id: Number,
    name: String,
    description: String,
    catch_phrase: String,
    sell: Number,
    special_sell: Number,
    shadow: String,
    vision: String,
    catch_difficulty: String,
    surface: Boolean,
    lighting_type: String,
    hha: Object,
    size: String,
    colors: Object,
    availability: Object,
    image: Object
})

export let critters =  model('Critters', schema, 'critters');
export let insects = model('Bugs', schema, 'insects');
export let fish =  model('Fish', schema, 'fish');
export let seaCreatures = model('Sea_Creatures', schema, 'sea_creatures');


