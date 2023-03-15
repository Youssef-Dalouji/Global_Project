const express=require('express')
const router=express.Router()
const bcryptjs=require('bcryptjs')
const {modelUserInfo}=require('../models/schemaUserInfo')
//Routes

router.post('/',async (req,res)=>{
    const {email,password}=req.body
    try{
        const data=await modelUserInfo.findOne({email:email})
        if(data){
            const resultat=bcryptjs.compareSync(password,data.password)
            if(resultat){
                    res.status(200).json([{token:data.token,idUser:data.idUser,name:data.name}])
            }else{
                res.status(404).json([{operation:0}])
            }
        }
        else{
            res.status(404).json([{operation:0}])
        }
    }catch(err){
        res.status(400).json([{operation:0}])
    }

})
module.exports=router