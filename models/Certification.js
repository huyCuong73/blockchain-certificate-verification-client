import mongoose from "mongoose";

const schema = new mongoose.Schema({
    from: {type:String},
    to: {type:String},
    data: {type:Object},
    docId: {type:String}
}, {timestamps: true})

export const CertificationModel = mongoose.model('certifications', schema)