const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const maxAge =  3*24*60*60



const createToken = (id)=>{
    return jwt.sign({id},"secret",{
        expiresIn:maxAge

    })
}

const handleErros = (err)=>{
    let errors = {email:"",password:"", msg:""}

    if(err.message === "incorrect email") errors.email="email is not registered"
    if(err.message === "incorrect password") errors.password="password is wrong"

    if(err.code===11000){
        errors.email ="Email is registered before"
        return errors
    }

    
    
    if(err.message.includes("Users validation failed")){
        errors.msg="Users validation failed"
    }
    if(err.message.includes("Password must be atleast 5 charachter")){
        errors.msg="Password must be atleast 5 charachter"
    }

    return errors
}



module.exports.register =async (req,res,next)=>{

   try {
        const {email, password} = req.body
        if(password.length <5)
            throw new Error("Password must be atleast 5 charachter")
      const user =  await User.create({email , password})
        const token = createToken(user._id)
        res.cookie('jwt', token , {
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
        })      



        res.status(201).json({user:user._id, created:true})
   } catch (err) {
    // console.error(err);
    

    const errors = handleErros(err)
    // console.log(errors);
    res.json({errors,created:false})
   }
}
module.exports.login =async (req,res,next)=>{
    try {
        const {email, password} = req.body
       
      const user =  await User.login({email , password})
        const token = createToken(user._id)
        res.cookie('jwt', token , {
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
        })      



        res.status(200).json({user:user._id, created:true})
   } catch (err) {
    // console.error(err);
    

    const errors = handleErros(err)
    // console.log(errors);
    res.json({errors,created:false})
   }
} 