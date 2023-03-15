const jwt=require('jsonwebtoken')
require('dotenv/config')
function middlewareProtect(req,res,next){
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SEC)
            req.user={idUser:decoded.id}
            next()
        }catch(err){
            res.status(401).json([{message:"Not authorized"}])
        }
    }
    if(!token){
        res.status(401).json([{message:"Not authorized, no token"}])
    }
}
module.exports={middlewareProtect}