import {Schema, model} from 'mongoose';

let schema = new Schema({
    name: String,
    birthday: String,
    species: String,
    gender: String,
    hobby: String,
    catchphrase: String,
    clothing: Number,
    attributes: Object,
    home: Object,
    favorites: Object,
    personality: Object,
    filename: String,
    image: Object
})

export let villager = model('Villagers', schema, 'villagers')
