import mongoose from "mongoose";



export const TechnologySchema = new mongoose.Schema({
    name: { type: String },
    knowledge: { type: String },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
});