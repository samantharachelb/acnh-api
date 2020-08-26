import * as mongoose from "mongoose";

let schema = new mongoose.Schema({
    id: Number,
    name: String,
    real_artwork_title: String,
    artist: String,
    description: String,
    size: String,
    catalog: String,
    tag: String,
    hha: Object,
    variants: Object
});

export let art = mongoose.model('Art', schema, 'art');
