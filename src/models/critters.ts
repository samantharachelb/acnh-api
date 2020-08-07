import * as mongoose from "mongoose";

let schema = new mongoose.Schema({

})

export let Critters =  mongoose.model('Critters', schema, 'critters');
export let Bugs = mongoose.model('Bugs', schema, 'bugs');
export let Fish =  mongoose.model('Fish', schema, 'fish');
export let SeaCreatures = mongoose.model('Sea Creatures', schema, 'sea_creatures');

//export default {Critters, Bugs, Fish, SeaCreatures}