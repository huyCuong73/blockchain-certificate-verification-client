import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default:"guest"},
}, {timestamps: true})

export const AuthModel = mongoose.model('Auth', schema)