const express=require('express')
const router=express.Router()
const {modelUserInfo}=require('../models/schemaUserInfo')
const {middlewareProtect}=require('./middlewareProtect')
//Routes

router.get('/',middlewareProtect,async (req,res)=>{
    const {idUser}=req.user
    try{
        const data=await modelUserInfo.findOne({idUser:idUser}).select('-password')
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json([{}])
        }
    }catch(err){
        res.status(401).json([{message:err}])
    }
})
module.exports=router