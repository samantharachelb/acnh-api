import * as mongoose from "mongoose";

let schema = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    size: String,
    real_artwork_title: String,
    artist: String,
    description: String,
    hha_base_points: Number,
    interact: Boolean,
    tag: String,
    catalog: String,
    variants: Object
});

let Art = module.exports = mongoose.model('Art', schema, 'art');
module.exports.get = function (callback: any, limit: any) {
    Art.find(callback).limit(limit);
};