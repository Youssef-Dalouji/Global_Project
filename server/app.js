const express=require('express')
const helmet = require("helmet");
const cors =require('cors')
const { ConnectDB } = require('./models/connect')
const app=express()
const userRegister=require('./router/userRegistre')
const userInfo=require('./router/userInfo')
const getMe=require('./router/getMe')
const room=require('./router/room')
const userChat=require('./router/userChat')
require('dotenv/config')
// Middleware Technique
app.use(express.json())
app.use(cors())
app.use(helmet())
//Middleware Router
app.use('/userRegistre1923',userRegister)
app.use('/userinfo',userInfo)
app.use('/CO-7520-135',getMe)
app.use('/room',room)
app.use('/M-1351919175',userChat)
// Connect with database
ConnectDB()
//Running Serveur
app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log("Serveur Lance en port "+process.env.PORT)
    }else{
        console.log("Problem Lancement de serveur Error : "+err)
    }
})

