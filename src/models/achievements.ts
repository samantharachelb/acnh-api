import * as mongoose from 'mongoose';

let schema = new mongoose.Schema({
    id: Number,
    num: Number,
    name: String,
    description: String,
    criteria: String,
    sequential: Boolean,
    internal_name: String,
    internal_category: String,
    num_tiers: Number,
    tiers: Object
})

export let achievements = mongoose.model('Achievements', schema, 'achievements');
