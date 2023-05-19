const { Schema, default: mongoose } = require('mongoose')
 



const userSchema= new Schema({
    motifId:{type:String},
    EngID:{
        type:Schema.Types.ObjectId,
        ref:"engagements"

    },
    Score:{type:Date},
    TimeStamp:{type:String},
     
     

})
 


module.exports = mongoose.model('foundmotifs',userSchema)