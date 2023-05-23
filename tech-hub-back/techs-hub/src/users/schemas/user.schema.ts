import * as mongoose from "mongoose";


export const UserSchema = new mongoose.Schema({
    name: {type: String},
    password: {type: String},
    email: {type: String, unique:true},
    seniority: {type: String},
    age: {type: Number},
    technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tech' }]
})
