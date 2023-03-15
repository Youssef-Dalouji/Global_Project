const mongoose=require('mongoose')
const schemaUserInfo=mongoose.Schema({
    idUser:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
},{
    collection:'userinfo'
})
const modelUserInfo=mongoose.model('UserInfo',schemaUserInfo,'userinfo')
module.exports.modelUserInfo=modelUserInfo