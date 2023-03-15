const express=require('express')
const router=express.Router()
const {middlewareProtect}=require('./middlewareProtect')
const {modelRoomChat}=require('../models/schemaRoomChat')
//Routes

router.post('/create',middlewareProtect,async(req,res)=>{
    const {idUser}=req.user
    const {idRoom,name,nameRoom}=req.body
    const newData={idUser:idUser,idRoom:idRoom,name:name,users:[{name:name,idUser:idUser,connectState:true}],nameRoom:nameRoom}
    try{
        await modelRoomChat.create(newData,(err,data)=>{
            if(data)return res.status(201).json([{operation:1}])
            res.status(200).json([{operation:0}])
        })
    }catch(err){
        res.status(401).json([{operation:0,message:err}])
    }
})
router.post('/query',middlewareProtect,async (req,res)=>{
    const {idRoom}=req.body
    try{
        const findRoom=await modelRoomChat.findOne({idRoom:idRoom})
        if(findRoom){
            res.status(200).json([{operation:1}])
        }else{
            res.status(200).json([{operation:0}])
        }
    }catch(err){
        res.status(404).json([{message:'Not Found',Error:err}])
    }
})
router.delete('/remove',middlewareProtect,async (req,res)=>{
    const idRoom=req.headers.idroom
    try{
        const deleteRoom=await modelRoomChat.deleteMany({idRoom:idRoom})
        if(deleteRoom){
            res.status(201).json([{operation:1}])
        }else{
            res.status(401).json([{operation:0}])
        }
    }catch(err){
        res.status(401).json([{operation:0}])
    }
})
router.post('/login',middlewareProtect,async (req,res)=>{
    const {idUser}=req.user
    const {idRoom,name}=req.body
    let verficationEXIST_USER=false
    try{
        const findRoom=await modelRoomChat.findOne({idRoom:idRoom})
        if(findRoom){
            findRoom.users.forEach((item)=>{
                if(item.idUser==idUser){
                    verficationEXIST_USER=true
                }
            })
            if(verficationEXIST_USER==false){
                const updateRoomUsers=await modelRoomChat.updateOne({idRoom:idRoom},{$set:{users:[...findRoom.users,{name:name,idUser:idUser,connectState:true}]}})
                if(updateRoomUsers){
                    res.status(201).json([{operation:1}])
                }else{
                    res.status(201).json([{operation:0}])
                }
            }else{
                res.status(200).json([{operation:1}])
            }
        }else{
            res.status(201).json([{operation:0}])
        }
    }catch(err){
        res.status(401).json([{operation:0,message:err}])
    }
})
router.post('/ConnectRoom',middlewareProtect,async (req,res)=>{
    const {idUser}=req.user
    const {idRoom}=req.body
    let newListUsers=[]
    try{
        const getDataRoom=await modelRoomChat.findOne({idRoom:idRoom})
        let Probe=false
        if(getDataRoom){
           getDataRoom.users.forEach((item)=>{
                if(item.idUser==idUser){
                    if(item.connectState==true){
                        Probe=true
                    }else{
                        let newObjectUser={name:item.name,idUser:idUser,connectState:true}
                        newListUsers.push(newObjectUser)
                    }
                }else{
                    newListUsers.push(item)
                }
           })
           if(Probe){
            res.status(200).json([{operation:1}])
           }else{
            modelRoomChat.updateOne({idRoom:idRoom},{$set:{users:newListUsers}},(err,sucess)=>{
                if(sucess){
                    res.status(200).json([{operation:0}])
                }else{
                    res.status(400).json([{operation:0}])
                }
            })
           }
        }else{
            res.status(200).json([{operation:0}])
        }
    }catch(err){
        res.status(400).json([{message:err}])
    }
})
router.post('/queryInformationsRoom',middlewareProtect,async (req,res)=>{
    const {idRoom}=req.body
    try{
        await modelRoomChat.findOne({idRoom:idRoom},(err,data)=>{
            if(data){
                res.status(200).json([{operation:1,data:data}])
            }else{
                res.status(200).json([{operation:0,message:err}])
            }
        }).clone()
    }catch(err){
        res.status(500).json([{operation:0,message:err}])
    }
})
module.exports=router