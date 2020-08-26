import {Schema, model} from 'mongoose';

let schema = new Schema({
    id: Number,
    name: String,
    birthday: String,
    npc_id: String,
    attributes: Object,
    gender: Object,
    image: Object
})

export let specialNpc = model('Special NPCs', schema, 'special_npcs');
