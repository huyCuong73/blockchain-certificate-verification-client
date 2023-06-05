import mongoose from "mongoose";

const schema = new mongoose.Schema({
    reqId : {type:String},
    from: {type:String},
    to: {type:String},
    encryptedData: {type:String},
    encryptedAesKey: {type:String}
}, {timestamps: true})

export const ResponseModel = mongoose.model('responses', schema)