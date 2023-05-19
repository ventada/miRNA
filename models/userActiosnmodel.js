const { Schema, default: mongoose } = require('mongoose')
 



const userSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"

    },
    actionID:{type:String},
    seqID:{type:Date},
    actionsTimetamp:{type:String},
    EngId:{type:String},
    
     
     

})
 


module.exports = mongoose.model('useractions',userSchema)