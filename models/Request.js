import mongoose from "mongoose";

const schema = new mongoose.Schema({
    from: {type:String},
    to: {type:String},
    isPending: {type: Boolean, default: true},
    requestedDoc: {type: String},
    publicKey: {type:String, require: true}
}, {timestamps: true})

export const RequestModel = mongoose.model('requests', schema)