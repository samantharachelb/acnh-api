import {Schema, model} from 'mongoose';

let schema = new Schema({
    id: Number,
    name: String,
    diy: Boolean,
    size: String,
    catalog: String,
    customize: Boolean,
    customization_kit_cost: Number,
    hha: Object,
    body: Object,
    pattern: Object,
    variant_id: Number,
    variants: Object
});

export let villagerPhotos = model('Villager Photos', schema, 'photos');
export let villagerPosters = model('Villager Posters', schema, 'posters');
