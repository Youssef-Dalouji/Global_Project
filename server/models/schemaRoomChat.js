const mongoose=require('mongoose')
const schemaRoomChat=mongoose.Schema({
    idUser:{
        type:String,
        required:true
    },
    idRoom:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    users:{
        type:Array
    }
    ,dateCreate:{
        type:Date,
        default:Date.now
    },
    nameRoom:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    collection:'roomChat'
})
const modelRoomChat=mongoose.model('RoomChat',schemaRoomChat,'roomChat')
module.exports={modelRoomChat}