const ConnectDB=()=>{
    const mongoose=require('mongoose')
    require('dotenv/config')
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology:true},(err)=>{
        if(!err){
            console.log("Connect Successfully")
        }else{
            console.log('Error Connect With DataBase Error : '+err)
        }
    })
}
module.exports={ConnectDB}
