import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    date: {type: String},
    content: {type: String}
})

const schema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    notif:[{
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        date: {type: String},
        content: {type: String},
        dir: {type:String},
        sectionId: {type:String},
        state: {type: Boolean, default:false}
    }],
    newNotifCount: {type: Number, default:0}
}, {timestamps: true})

export const NotificationModel = mongoose.model('notification', schema)
