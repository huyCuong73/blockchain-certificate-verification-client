import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    defaultBackground: {type:Number},
    stuName: {type: String},
    stuId: {type: String},
    stuClass: {type: String},
    createdBy: {type:String, ref: "user"}
}, {timestamps: true})

export const UserModel = mongoose.model('users', schema)