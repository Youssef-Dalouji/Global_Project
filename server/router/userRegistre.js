const express=require('express')
const router=express.Router()
require('dotenv/config')
const bcryptjs=require('bcryptjs')
const jwt=require("jsonwebtoken")
const {modelUserInfo}=require('../models/schemaUserInfo')
router.post('/',async (req,res)=>{
    const {idUser,name,email,password}=await req.body
    const token=await jwt.sign({id:idUser},process.env.JWT_SEC)
    const salt=await bcryptjs.genSalt(7)
    const newPassword= await bcryptjs.hash(password,salt)
    const newData=await {idUser:idUser,name:name,email:email,password:newPassword,token:token}
    try{
        const registre= await new modelUserInfo(newData)
        registre.save((err,data)=>{
            if(!err){
                res.status(201).json([{operation:1}])
            }
        })
    }catch(err){
        res.status(400).json([{message:err}])
    }
})
module.exports=router