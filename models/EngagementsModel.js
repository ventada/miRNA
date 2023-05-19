const { Schema, default: mongoose } = require('mongoose')
 



const userSchema= new Schema({
    EngID:{
        type:String,

    },
    userId:{type:Schema.Types.ObjectId ,
    ref:"users"
    },
    startDate:{type:Date},
    endTime:{type:Date},
     
     

})
 


module.exports = mongoose.model('engagements',userSchema)