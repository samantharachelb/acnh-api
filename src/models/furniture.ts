import * as mongoose from "mongoose";

let schema = new mongoose.Schema({});

export let Furniture = mongoose.model('Furniture', schema, 'furniture');
export let Housewares = mongoose.model('Housewares', schema, 'housewares');
export let Misc = mongoose.model('Misc', schema, 'misc');
export let Wallmounted = mongoose.model('Wall-Mounted', schema, 'wall_mounted');

