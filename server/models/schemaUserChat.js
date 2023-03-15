const mongoose=require('mongoose')
const schemaUserChat=mongoose.Schema({
    idUser:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String
    },
    message:{
        type:String,
        required:true
    },
    idRoom:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true,
    collection:'userchat'
})
const modelUserChat=mongoose.model('UserChat',schemaUserChat,'userchat')
module.exports={modelUserChat}