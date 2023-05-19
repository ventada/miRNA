const jwt = require("jsonwebtoken")
const user = require("../models/UserModel");
const UserModel = require("../models/UserModel");


module.exports.checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,"secret",async (err,decodedToken)=>{
            if(err){

                res.json({status:false})
                next()
            }else{
                const user = await UserModel.findById(decodedToken.id)
                if(user) res.json({stsus:true , email:user.email})
                else  res.json({status:false})
                next()

            }
        })
    }else{
        res.json({status:false})
        next()
    }
}